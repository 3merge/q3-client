export default class ImageResize {
  constructor(quill, handleExternalState) {
    this.quill = quill;

    document.execCommand(
      'enableObjectResizing',
      false,
      'false',
    );

    this.quill.root.addEventListener(
      'click',
      this.handleClick,
      false,
    );

    this.quill.root.parentNode.style.position =
      this.quill.root.parentNode.style.position ||
      'relative';

    this.handleExternalState = handleExternalState;
  }

  handleClick = (evt) => {
    if (
      evt.target &&
      evt.target.tagName &&
      evt.target.tagName.toUpperCase() === 'IMG'
    ) {
      if (this.img === evt.target) {
        // we are already focused on this image
        return;
      }
      if (this.img) {
        // we were just focused on another image
        this.hide();
      }
      // clicked on an image inside the editor
      this.show(evt.target);
    } else if (this.img) {
      // clicked on a non image
      this.hide();
    }
  };

  show = (img) => {
    this.img = img;
    this.showOverlay();
    this.repositionElements();
    this.handleExternalState({
      image: this.img,
      overlay: this.overlay,
      repositionElements: this.repositionElements.bind(
        this,
      ),
    });
  };

  showOverlay = () => {
    if (this.overlay) {
      this.hideOverlay();
    }

    this.quill.setSelection(null);
    this.setUserSelect('none');

    this.overlay = document.createElement('div');
    Object.assign(this.overlay.style, {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      border: '1px solid blue',
    });

    this.boxes = [];

    this.quill.root.parentNode.appendChild(this.overlay);
    this.repositionElements();
  };

  hideOverlay = () => {
    if (!this.overlay) {
      return;
    }

    try {
      // Remove the overlay
      if (this.quill.root.parentNode)
        this.quill.root.parentNode.removeChild(
          this.overlay,
        );
    } catch (e) {
      // null
    }

    this.overlay = undefined;

    // reset user-select
    this.setUserSelect('');
  };

  repositionElements = () => {
    if (!this.overlay || !this.img) {
      return;
    }

    // position the overlay over the image
    const parent = this.quill.root.parentNode;
    const imgRect = this.img.getBoundingClientRect();
    const containerRect = parent.getBoundingClientRect();

    Object.assign(this.overlay.style, {
      left: `${
        imgRect.left -
        containerRect.left -
        1 +
        parent.scrollLeft
      }px`,
      top: `${
        imgRect.top - containerRect.top + parent.scrollTop
      }px`,
      width: `${imgRect.width}px`,
      height: `${imgRect.height}px`,
    });
  };

  hide = () => {
    this.hideOverlay();
    this.img = undefined;
    this.handleExternalState({});
  };

  setUserSelect = (value) => {
    [
      'userSelect',
      'mozUserSelect',
      'webkitUserSelect',
      'msUserSelect',
    ].forEach((prop) => {
      // set on contenteditable element and <html>
      this.quill.root.style[prop] = value;
      document.documentElement.style[prop] = value;
    });
  };
}

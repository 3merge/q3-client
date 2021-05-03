import Quill from 'quill';

class ImageBlot extends Quill.import('formats/image') {
  static create(value) {
    return typeof value === 'string'
      ? super.create(value)
      : value;
  }

  static value(domNode) {
    return domNode;
  }
}

Quill.register(ImageBlot);
export default ImageBlot;

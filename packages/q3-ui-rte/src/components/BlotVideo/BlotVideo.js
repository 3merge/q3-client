import Quill from 'quill';

const BlockEmbed = Quill.import('blots/block/embed');

class BlotVideo extends BlockEmbed {
  static create(value) {
    const node = super.create(value);
    node.setAttribute('src', value);
    node.setAttribute('frameborder', '0');
    node.setAttribute('allowfullscreen', true);
    node.style.width = 500;

    return node;
  }

  static value(node) {
    return node.getAttribute('src');
  }
}

BlotVideo.blotName = 'iframe';
BlotVideo.className = 'ql-iframe';
BlotVideo.tagName = 'iframe';

export default BlotVideo;

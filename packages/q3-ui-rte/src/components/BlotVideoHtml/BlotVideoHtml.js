import Quill from 'quill';

const BlockEmbed = Quill.import('blots/block/embed');

class BlotVideoHtml extends BlockEmbed {
  static create(value) {
    const node = super.create(value);
    const source = document.createElement('source');
    source.setAttribute('src', value);
    node.appendChild(source);
    node.setAttribute('controls', true);
    return node;
  }

  static value(node) {
    return node.getAttribute('src');
  }
}

BlotVideoHtml.blotName = 'video';
BlotVideoHtml.className = 'ql-video';
BlotVideoHtml.tagName = 'video';

export default BlotVideoHtml;

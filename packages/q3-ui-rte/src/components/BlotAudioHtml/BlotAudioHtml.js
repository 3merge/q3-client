import Quill from 'quill';

const BlockEmbed = Quill.import('blots/block/embed');

class BlotAudioHtml extends BlockEmbed {
  static create(value) {
    const node = super.create(value);
    node.setAttribute('src', value);
    node.setAttribute('controls', '');
    return node;
  }

  static value(node) {
    return node.getAttribute('src');
  }
}

BlotAudioHtml.blotName = 'audio';
BlotAudioHtml.className = 'ql-audio';
BlotAudioHtml.tagName = 'audio';

export default BlotAudioHtml;

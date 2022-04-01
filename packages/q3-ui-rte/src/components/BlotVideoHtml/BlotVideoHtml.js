import Quill from 'quill';
import { insertRichMediaBlock } from '../BlotAudioHtml/BlotAudioHtml';

const BlockEmbed = Quill.import('blots/embed');

class BlotVideoHtml extends BlockEmbed {
  static create(value) {
    const node = super.create(value);
    node.setAttribute('src', value);
    node.setAttribute('controls', true);
    return insertRichMediaBlock(node);
  }

  static value(node) {
    return node.getAttribute('src');
  }
}

BlotVideoHtml.blotName = 'video';
BlotVideoHtml.className = 'ql-video';
BlotVideoHtml.tagName = 'video';

export default BlotVideoHtml;

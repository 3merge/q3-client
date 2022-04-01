import Quill from 'quill';

const BlockEmbed = Quill.import('blots/embed');

export const insertRichMediaBlock = (node) => {
  const wrapper = document.createElement('div');
  wrapper.classList.add('blockmedia');
  wrapper.appendChild(node);
  wrapper.insertAdjacentHTML('afterbegin', '&nbsp;');
  wrapper.insertAdjacentHTML('beforeend', '&nbsp;');
  return wrapper;
};

class BlotAudioHtml extends BlockEmbed {
  static create(value) {
    const node = super.create(value);
    node.setAttribute('src', value);
    node.setAttribute('controls', '');
    return insertRichMediaBlock(node);
  }

  static value(node) {
    return node.getAttribute('src');
  }
}

BlotAudioHtml.blotName = 'audio';
BlotAudioHtml.className = 'ql-audio';
BlotAudioHtml.tagName = 'audio';

export default BlotAudioHtml;

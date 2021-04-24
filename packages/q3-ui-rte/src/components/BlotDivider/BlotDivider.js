import Quill from 'quill';

const BlockEmbed = Quill.import('blots/block/embed');

class BlotDivider extends BlockEmbed {}

BlotDivider.blotName = 'divider';
BlotDivider.tagName = 'hr';

export default BlotDivider;

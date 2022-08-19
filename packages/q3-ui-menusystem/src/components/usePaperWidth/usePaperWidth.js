import { COLLAPSED, RAILED, STACKED } from '../constants';

export const slim = 90;
export const standard = 270;

const usePaperWidth = (componentVariant) =>
  ({
    [COLLAPSED]: slim,
    [RAILED]: standard + slim,
    [STACKED]: standard,
  }[componentVariant] || standard);

export default usePaperWidth;

import {
  NESTED_DROPDOWN_SELECTOR,
  dropdown,
} from './Horizontal';

const getCss = (alignment) =>
  dropdown({
    alignment,
  })[NESTED_DROPDOWN_SELECTOR];

describe('HoriztonalNavigation', () => {
  it('should align left', () =>
    expect(getCss('left')).toMatchObject({
      left: 'auto',
      right: '100%',
    }));

  it('should align right', () =>
    expect(getCss('right')).toMatchObject({
      left: '100%',
      right: 'auto',
    }));
});

import {
  getExpectedColumnCount,
  calculateWidth,
  MINIMUM_COLUMN_WIDTH,
} from './useWidth';

describe('useWidth', () => {
  it('should return maximum width within width constraint', () => {
    expect(getExpectedColumnCount(1200)).toBeCloseTo(
      171.43,
    );
  });

  it('should return minimum', () => {
    expect(getExpectedColumnCount(133)).toBeCloseTo(
      MINIMUM_COLUMN_WIDTH,
    );
  });

  it("should get the element's bounding width", () => {
    const getBoundingClientRect = jest
      .fn()
      .mockReturnValue('width', 1000);

    expect(calculateWidth({ getBoundingClientRect }));
    expect(getBoundingClientRect).toHaveBeenCalled();
  });
});

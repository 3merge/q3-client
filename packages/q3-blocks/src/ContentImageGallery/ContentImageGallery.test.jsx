import { pair } from './ContentImageGallery';

describe('"pair"', () => {
  it('should split array into pairs', () => {
    const o = pair([1, 2, 3, 4, 5, 6, 7, 8]);

    expect(o).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
    ]);
  });
});

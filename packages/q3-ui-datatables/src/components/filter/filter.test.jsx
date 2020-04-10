import {
  removeUncontrollableFilterProps,
  countParams,
} from './filter';

describe('Filter', () => {
  it('should count parameters by ampersand', () => {
    const p = countParams({
      toString: jest.fn().mockReturnValue('foo=1&bar=2'),
    });

    expect(p).toBe(2);
  });

  it('should return 0 by default', () => {
    const p = countParams();
    expect(p).toBe(0);
  });

  it('should remove automated query params', () => {
    const deleteOne = jest.fn();
    removeUncontrollableFilterProps({ delete: deleteOne });
    expect(deleteOne).toHaveBeenCalledWith('page');
    expect(deleteOne).toHaveBeenCalledWith('limit');
    expect(deleteOne).toHaveBeenCalledWith('search');
  });
});

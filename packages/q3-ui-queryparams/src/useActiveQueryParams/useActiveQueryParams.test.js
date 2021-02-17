import { useLocation, useNavigate } from '@reach/router';
import useActiveQueryParams, {
  getRelevantParams,
} from './useActiveQueryParams';

jest.mock('@reach/router', () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

describe('useActiveQueryParams', () => {
  describe('"getRelevantParams"', () => {
    it('should remove projection-based query keys', () =>
      expect(
        getRelevantParams({
          page: 1,
          foo: 1,
          limit: 1,
          bar: 1,
          sort: 1,
        }),
      ).toEqual([
        ['foo', 1],
        ['bar', 1],
      ]));
  });

  it('should navigate onDelete', () => {
    const mock = jest.fn();
    useNavigate.mockReturnValue(mock);
    useLocation.mockReturnValue({
      search: '?foo=1&bar=1',
    });

    useActiveQueryParams()[1].onDelete();
    expect(mock).toHaveBeenCalledWith('?foo=1');
  });

  it('should remove from array onDelete', () => {
    const mock = jest.fn();
    useNavigate.mockReturnValue(mock);
    useLocation.mockReturnValue({
      search: '?foo=1&bar=1,2,3',
    });

    useActiveQueryParams()[2].onDelete();
    expect(mock).toHaveBeenCalledWith(
      '?foo=1&bar=in(1%2C3)',
    );
  });
});

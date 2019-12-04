import { useFilters } from '..';
import useRest from '../hooks';

jest.mock('../hooks', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('useFilters custom hook', () => {
  it('should format search string', () => {
    useFilters({
      fields: ['foo', 'bar', 'quux'],
      coll: 'demo',
    });

    expect(useRest).toHaveBeenCalledWith(
      expect.objectContaining({
        url:
          '/search?coll=demo&fields[]=foo&fields[]=bar&fields[]=quux',
      }),
    );
  });

  it('should append query string', () => {
    useFilters({
      query: '?search=hi',
      fields: ['foo'],
      coll: 'demo',
    });

    expect(useRest).toHaveBeenCalledWith(
      expect.objectContaining({
        url: '/search?coll=demo&fields[]=foo&search=hi',
      }),
    );
  });

  it('should create a drop-down options list', () => {
    useRest.mockReturnValue({
      fields: {
          example: ['foo', 'bar']
      }
    });

  const filters = useFilters({
      fields: ['foo'],
      coll: 'demo',
    });

    expect(filters.getOptions('example')).toEqual([
      { label: 'foo', value: 'foo' },
      { label: 'bar', value: 'bar' }
    ]);
  });
});

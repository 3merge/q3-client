import useFilters from '.';
import useRest from '../useRest';

jest.mock('../useRest', () => ({
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
          '/search?collectionName=demo&fields[]=foo&fields[]=bar&fields[]=quux',
      }),
    );
  });

  it.skip('should append query string', () => {
    useFilters({
      query: '?search=hi',
      fields: ['foo'],
      coll: 'demo',
    });

    expect(useRest).toHaveBeenCalledWith(
      expect.objectContaining({
        url:
          '/search?collectionName=demo&fields[]=foo&search=hi',
      }),
    );
  });

  it('should create a drop-down options list', () => {
    useRest.mockReturnValue({
      fields: {
        example: ['foo', 'bar'],
      },
    });

    const filters = useFilters({
      fields: ['foo'],
      coll: 'demo',
    });

    expect(filters.getOptions('example')).toEqual([
      'foo',
      'bar',
    ]);
  });
});

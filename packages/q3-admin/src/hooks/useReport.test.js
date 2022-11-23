import useRest from 'q3-ui-rest';
import useReport from './useReport';

jest.unmock('q3-ui-locale');
jest.mock('q3-ui-rest');

describe('useReport', () => {
  it('should assemble report query', () => {
    useRest.mockReturnValue({});
    useReport('foo', {
      bar: 1,
    });

    expect(useRest).toHaveBeenCalledWith(
      expect.objectContaining({
        url: '/reports',
        location: {
          search: '?bar=1&template=string(foo)',
        },
      }),
    );
  });

  it('should return error', () => {
    useRest.mockReturnValue({
      fetchingError: true,
    });
    expect(useReport('foo')).toMatchObject({
      error: true,
    });
  });

  it('should return error', () => {
    useRest.mockReturnValue({});
    expect(useReport('foo')).toMatchObject({
      error: true,
    });
  });

  it('should return loading', () => {
    useRest.mockReturnValue({
      fetching: true,
    });
    expect(useReport('foo')).toMatchObject({
      error: false,
      loading: true,
    });
  });

  it('should return data', () => {
    useRest.mockReturnValue({
      data: [1],
    });

    expect(useReport('foo')).toMatchObject({
      error: false,
      data: [1],
    });
  });
});

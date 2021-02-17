import moxios from 'jest-mock-axios';
import useIo from './useIo';

jest.mock('q3-ui-helpers/lib/url', () => ({
  toParamsString: jest.fn().mockReturnValue('foo=1&bar=1'),
}));

jest.mock('axios');

jest.fn('react-i18next', () => ({
  useTranslation: jest.fn().mockReturnValue({
    t: jest.fn(),
  }),
}));

jest.mock('notistack', () => {
  const enqueueSnackbar = jest.fn();

  return {
    enqueueSnackbar,
    useSnackbar: jest.fn().mockReturnValue({
      enqueueSnackbar,
    }),
  };
});

describe('useIo', () => {
  it('should handle resolve', () => {
    const deleteFn = jest.fn();
    const setFn = jest.fn();

    useIo(1, {
      delete: deleteFn,
      set: setFn,
    }).exportCollection('test')();

    expect(moxios.post).toHaveBeenCalledWith(
      '/io?foo=1&bar=1',
    );

    expect(setFn).toHaveBeenCalledWith('ids', 1);
    expect(setFn).toHaveBeenCalledWith('template', 'test');
    expect(deleteFn).toHaveBeenCalled();
  });

  it('should handle reject', () => {
    useIo().importCollection('test')([
      {
        src: 'test.pdf',
      },
    ]);

    expect(moxios.post).toHaveBeenCalledWith(
      '/io?template=test',
      expect.any(FormData),
      expect.any(Object),
    );
  });
});

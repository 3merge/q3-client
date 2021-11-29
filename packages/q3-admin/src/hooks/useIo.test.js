import moxios from 'jest-mock-axios';
import useIo from './useIo';

jest.mock('axios');

jest.fn('q3-ui-locale', () => ({
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
    const stub = new URLSearchParams(
      '?page=1&limit=20&foo=1&bar=1',
    );

    useIo(1, stub).exportCollection('test')();
    expect(moxios.post).toHaveBeenCalledWith(
      '/io?foo=1&bar=1&template=test&ids=1',
    );
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

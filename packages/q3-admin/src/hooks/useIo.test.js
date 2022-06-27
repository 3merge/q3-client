import React from 'react';
import moxios from 'jest-mock-axios';
import useIo from './useIo';

let useContext;
let stub;

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

beforeEach(() => {
  stub = new URLSearchParams(
    '?page=1&limit=20&foo=1&bar=1',
  );

  useContext = jest.spyOn(React, 'useContext');
  global.confirm = jest.fn();
});

afterEach(() => {
  moxios.reset();
});

describe('useIo', () => {
  it('should resolve export after confirming without IDs', () => {
    global.confirm.mockReturnValue(true);
    useContext.mockReturnValue({
      total: 1000,
    });

    useIo(null, stub).exportCollection('test')();
    expect(global.confirm).toHaveBeenCalled();
    expect(moxios.post).toHaveBeenCalledWith(
      '/io?foo=1&bar=1&template=test',
    );
  });

  it('should resolve export with selection', () => {
    global.confirm.mockReturnValue(true);
    useContext.mockReturnValue({});
    useIo(1, stub).exportCollection('test')();
    expect(global.confirm).not.toHaveBeenCalled();
    expect(moxios.post).toHaveBeenCalledWith(
      '/io?foo=1&bar=1&template=test&ids=1',
    );
  });

  it('should resolve export after confirmation of limit', () => {
    global.confirm.mockReturnValue(true);
    useContext.mockReturnValue({
      total: 5000,
    });

    useIo(null, stub).exportCollection('test1')();
    expect(global.confirm).toHaveBeenCalledWith(
      expect.stringContaining('3500'),
    );

    expect(moxios.post).toHaveBeenCalledWith(
      '/io?foo=1&bar=1&template=test1',
    );
  });

  it('should resolve export after confirmation of selection', () => {
    global.confirm.mockReturnValue(true);
    useContext.mockReturnValue({
      total: 150,
    });

    useIo(null, stub).exportCollection('test2')();
    expect(global.confirm).toHaveBeenCalledWith(
      expect.stringContaining('No rows'),
    );

    expect(moxios.post).toHaveBeenCalledWith(
      '/io?foo=1&bar=1&template=test2',
    );
  });

  it('should not resolve export', () => {
    global.confirm.mockReturnValue(false);
    useContext.mockReturnValue({});
    useIo(null, stub).exportCollection('test')();
    expect(global.confirm).toHaveBeenCalled();
    expect(moxios.post).not.toHaveBeenCalled();
  });

  it('should send files as form data', () => {
    useContext.mockReturnValue({});
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

import React from 'react';
import { browser, object } from 'q3-ui-helpers';
import useServer from './useServer';

jest.mock('q3-ui-helpers', () => ({
  browser: {
    isBrowserReady: jest.fn().mockReturnValue(true),
    proxySessionStorageApi: jest.fn(),
  },
  object: {
    toJSON: jest.fn().mockReturnValue(1),
  },
}));

let spy;

beforeAll(() => {
  jest
    .spyOn(React, 'useEffect')
    .mockImplementation((fn) => fn());

  jest.spyOn(React, 'useRef').mockReturnValue({
    current: {
      helpers: {
        foo: 1,
      },
    },
  });

  spy = jest
    .spyOn(React, 'useState')
    .mockReturnValue([{}, jest.fn()]);
});

describe('useServer', () => {
  it('should save missing keys to locale storage', () => {
    useServer({});
    window.onbeforeunload();
    expect(object.toJSON).toHaveBeenCalledWith({
      helpers: {
        foo: 1,
      },
    });

    expect(
      browser.proxySessionStorageApi,
    ).toHaveBeenCalledWith('setItem', 'missingKeys', 1);
  });

  it('should return translated', () => {
    const t = jest.fn().mockReturnValue('success');
    spy.mockReturnValue([
      {
        exists: jest.fn().mockReturnValue(true),
        t,
      },
      jest.fn(),
    ]);

    expect(
      useServer({}).translate('foo', 'bar', { var: 1 }),
    ).toMatch('success');

    expect(t).toHaveBeenCalledWith('foo:bar', {
      var: 1,
    });
  });

  it('should return default', () => {
    spy.mockReturnValue([
      {
        exists: jest.fn().mockReturnValue(false),
      },
      jest.fn(),
    ]);

    expect(useServer({}).translate('foo', 'bar')).toMatch(
      'bar',
    );
  });
});

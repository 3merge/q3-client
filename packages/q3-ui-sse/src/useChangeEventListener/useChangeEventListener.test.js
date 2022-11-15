import React from 'react';
import { useEffectMock } from 'q3-ui-test-utils/lib/reactUtils';
import useRefresh from './useChangeEventListener';
import { attach, detach } from '../useChangeEvent';

useEffectMock();

jest.mock('../useChangeEvent', () => {
  const attachMock = jest.fn();
  const detachMock = jest.fn();

  const hook = jest.fn().mockReturnValue({
    attach: attachMock,
    detach: detachMock,
  });

  hook.attach = attachMock;
  hook.detach = detachMock;

  return hook;
});

describe('useChangeEventListener', () => {
  it('should debounce callback', (done) => {
    const poll = jest.fn().mockResolvedValue({});

    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        search: '?foo',
      },
    });

    attach.mockImplementation((fn) =>
      fn({
        data: {
          foo: 1,
        },
      }),
    );

    useRefresh('test', poll, 5);
    expect(attach).toHaveBeenCalledWith(
      expect.any(Function),
    );

    expect(poll).not.toHaveBeenCalled();

    setTimeout(() => {
      expect(poll).toHaveBeenCalledTimes(1);
      expect(poll).toHaveBeenCalledWith('?foo', {
        foo: 1,
      });
      done();
    }, 10);
  });
});

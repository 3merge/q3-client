import React from 'react';
import BaseNotificationsElement from 'q3-ui-notifications';
import Notifications from './Notifications';
import {
  // eslint-disable-next-line
  on as socketOnEvent,
  // eslint-disable-next-line
  emit as socketEmitEvent,
  // eslint-disable-next-line
  close as socketCloseEvent,
} from '../../hooks/useSocket';

jest.mock('q3-ui-notifications', () =>
  jest.fn().mockImplementation(() => <div />),
);

jest.mock('../../hooks/useSocket', () => {
  const emit = jest.fn();
  const close = jest.fn();

  const on = jest
    .fn()
    .mockImplementation((eventName, callback) => {
      callback({
        data: {
          hasDownloaded: false,
          label: 'Foo',
          id: '1',
        },
      });
    });

  return {
    getSocketInstance: jest.fn().mockReturnValue({
      emit,
      on,
      close,
    }),

    // although not exported in the real module,
    // this allows us to watch the mocks in our tests
    on,
    emit,
    close,
  };
});

describe('Notifications', () => {
  it('should de-deuplicate state list', async () => {
    const el = global.mount(<Notifications />);
    const { data } = el
      .find(BaseNotificationsElement)
      .props();

    expect(data).toHaveLength(1);
    expect(data[0]).toHaveProperty('id');
    expect(socketOnEvent).toHaveBeenCalledWith(
      'message',
      expect.any(Function),
    );
  });

  it('should emit socket event', () => {
    const el = global.mount(<Notifications />);
    const { onView } = el
      .find(BaseNotificationsElement)
      .props();

    onView(null, '1');
    expect(socketEmitEvent).toHaveBeenCalledWith(
      'acknowledge',
      '1',
      expect.any(Function),
    );
  });

  it('should close connection on unmount', () => {
    const el = global.mount(<Notifications />);

    el.unmount();
    expect(socketCloseEvent).toHaveBeenCalled();
  });
});

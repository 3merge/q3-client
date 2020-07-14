import React from 'react';
import NotificationLink from './NotificationReadOnly';

const mockObserver = (stub) => {
  const observe = jest.fn();

  global.window.IntersectionObserver = class {
    constructor(callback) {
      callback(stub);
    }

    observe() {
      observe();
      return this;
    }

    unobserve() {
      return this;
    }
  };

  return observe;
};

describe('NotificationLink', () => {
  it('should call view handler', () => {
    const onView = jest.fn();
    const observer = mockObserver([
      {
        isIntersecting: true,
      },
    ]);

    global.mount(
      <NotificationLink
        id="1"
        label="Msg"
        onView={onView}
        hasSeen={false}
      />,
    );

    expect(observer).toHaveBeenCalled();
    expect(onView).toHaveBeenCalledWith(
      expect.any(Object),
      '1',
    );
  });
});

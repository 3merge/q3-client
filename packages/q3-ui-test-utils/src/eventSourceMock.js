/* eslint-disable class-methods-use-this  */
import React from 'react';

export default ({ children, value, error }) => {
  Object.defineProperty(window, 'EventSource', {
    value: class EventSourceMock {
      addEventListener(name, fn) {
        if (!error)
          setTimeout(
            () =>
              fn({
                data: JSON.stringify(value),
              }),
            500,
          );
      }
    },
  });

  if (error && window.EventSourceMock.onerror)
    window.EventSourceMock.onerror();

  return children;
};

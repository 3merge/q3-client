/* eslint-disable class-methods-use-this */
export default () => {
  const close = jest.fn();
  const listeners = {};

  class Source {
    close() {
      close();
    }

    set onerror(fn) {
      listeners.onerror = fn;
    }

    set onmessage(fn) {
      listeners.onmessage = fn;
    }

    set onopen(fn) {
      listeners.onopen = fn;
    }
  }

  return {
    Source,
    close,
    listeners,
  };
};

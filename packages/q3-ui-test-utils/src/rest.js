import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

export default ({ define, children, delay = 200 }) => {
  const mock = new MockAdapter(Axios, {
    delayResponse: delay,
  });

  if (define && typeof define === 'function') {
    define(mock);
  }

  return children;
};

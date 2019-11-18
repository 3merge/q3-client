import React from 'react';
import Axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

export default ({ define, children, delay = 200 }) => {
  const mock = new MockAdapter(Axios, {
    delayResponse: delay,
  });

  define(mock);
  return children;
};

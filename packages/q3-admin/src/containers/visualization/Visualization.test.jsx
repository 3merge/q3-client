import React from 'react';
import axios from 'axios';
import {
  makeQueryString,
  getFrom,
  useVisualization,
} from './Visualization';

jest.mock('axios', () => {
  const inst = {};
  const thenable = (resp) =>
    jest.fn().mockImplementation((fn) => {
      fn(resp);
      return inst;
    });

  inst.then = thenable({ data: { foo: 1 } });
  inst.catch = thenable(false);

  return { get: jest.fn().mockReturnValue(inst) };
});

describe('Visualization', () => {
  describe('makeQueryString', () => {
    it('should return nothing without filters', () => {
      expect(makeQueryString()).toBe('');
    });

    it('should return loading indicator', () => {
      expect(makeQueryString({ foo: 1, bar: 1 })).toBe(
        '&foo=1&bar=1',
      );
    });
  });

  describe('getFrom', () => {
    it('should return nothing without filters', () => {
      const onData = jest.fn();
      const onError = jest.fn();
      getFrom('/localhost', onData, onError);
      expect(axios.get).toHaveBeenCalledWith('/localhost');
      expect(onData).toHaveBeenCalledWith({ foo: 1 });
      expect(onError).toHaveBeenCalledWith(false);
    });
  });
});

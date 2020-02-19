import 'jest-localstorage-mock';
import React from 'react';
import { useSessionStorage } from '.';

const setState = jest.fn();

jest
  .spyOn(React, 'useEffect')
  .mockImplementation((v) => v());

jest
  .spyOn(React, 'useState')
  .mockImplementation((v) => [v, setState]);

beforeEach(() => {
  setState.mockReset();
});

describe('PersistWatcher', () => {
  describe('"useSessionStorage"', () => {
    it('should append event listeners', () => {
      window.addEventListener = jest.fn();
      useSessionStorage(1);
      expect(window.addEventListener).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Function),
      );
    });

    it('should call state on handler', () => {
      window.addEventListener = jest.fn();
      sessionStorage['formik-persistence-foo'] = 'bar';
      useSessionStorage(1);

      const {
        mock: {
          calls: [[, fn]],
        },
      } = window.addEventListener;

      fn();
      expect(setState).toHaveBeenCalledWith([
        'formik-persistence-foo',
      ]);
    });
  });
});

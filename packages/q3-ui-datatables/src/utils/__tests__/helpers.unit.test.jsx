import React from 'react';
import * as utils from '../helpers';

const spy = jest.spyOn(React.Children, 'toArray');

afterEach(() => {
  spy.mockReset();
});

describe('data tables Utils', () => {
  describe('"hasKeys"', () => {
    it('should return falsy without an object', () =>
      expect(utils.hasKeys()).toBeFalsy());

    it('should return falsy with empty object', () =>
      expect(utils.hasKeys({})).toBeFalsy());
  });

  describe('"ellipsis"', () => {
    it('return full string', () =>
      expect(utils.ellipsis('abc', 5)).toMatch('abc'));

    it('return partial string', () =>
      expect(utils.ellipsis('abcdef', 3)).toMatch(
        'abc...',
      ));
  });

  describe('extractKeys', () => {
    it('return empty array', () => {
      expect(utils.extractKeys()).toEqual([]);
    });

    it('should filter out empty values', () => {
      spy.mockReturnValue([
        {
          props: {
            columns: {
              foo: 1,
              bar: '',
              quux: null,
              tharply: 1,
            },
          },
        },
      ]);

      // plus the attr
      expect(utils.extractKeys()).toHaveLength(3);
    });
  });

  describe('extractIds', () => {
    it('return empty array', () => {
      expect(utils.extractIds()).toEqual([]);
    });
  });

  describe('invoke', () => {
    it('should return input', () => {
      expect(utils.invoke(['foo'])).toEqual(['foo']);
    });

    it('should call fn with empty object', () => {
      const fn = jest.fn();
      utils.invoke(fn);
      expect(fn).toHaveBeenCalledWith({});
    });
  });
});

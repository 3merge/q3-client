import React from 'react';
import {
  requiresArray,
  requiresOptions,
  toArray,
  appendOptions,
  mapByName,
} from '../utils';

describe('Filter utilities', () => {
  describe('"mapByName"', () => {
    it('should flatten child props', () => {
      expect(
        mapByName([
          { props: { name: 'foo' } },
          { props: { name: 'bar' } },
        ]),
      ).toEqual(['foo', 'bar']);
    });
  });

  describe('"requiresArray"', () => {
    it('should return truthy on match', () =>
      expect(requiresArray('chips')).toBeTruthy());

    it('should return falsy', () =>
      expect(requiresArray('text')).toBeFalsy());
  });

  describe('"requiresOptions"', () => {
    it('should return as options', () => {
      const a = requiresOptions('select', ['uno']);
      return expect(a).toEqual([
        {
          label: expect.any(String),
          value: 'uno',
        },
      ]);
    });

    it('should return unmodified', () => {
      const a = requiresOptions('text', 'foo');
      return expect(a).toMatch('foo');
    });
  });

  describe('"toArray"', () => {
    it('should split by comma', () => {
      const a = toArray('hey, there');
      return expect(a).toHaveLength(2);
    });

    it('should return empty array', () => {
      const a = toArray(null);
      return expect(a).toEqual([]);
    });
  });

  describe('"appendOptions"', () => {
    it('should append options to children components', () => {
      const spy = jest.spyOn(React, 'cloneElement');
      appendOptions(
        [{ props: { name: 'foo', type: 'chips' } }],
        { foo: ['1'] },
      );
      expect(spy).toHaveBeenCalledWith(expect.any(Object), {
        options: ['1'],
      });
    });
  });
});

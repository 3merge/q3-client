import React from 'react';
import {
  requiresArray,
  requiresOptions,
  appendOptions,
} from '../utils';

describe('Filter utilities', () => {
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

  describe('"appendOptions"', () => {
    it('should append options to children components', () => {
      const spy = jest.spyOn(React, 'cloneElement');
      appendOptions(
        [{ props: { name: 'foo', type: 'chips' } }],
        { foo: ['1'] },
      );
      expect(spy).toHaveBeenCalledWith(
        expect.any(Object),
        {
          options: ['1'],
        },
        undefined,
      );
    });
  });
});

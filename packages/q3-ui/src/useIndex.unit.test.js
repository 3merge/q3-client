import React from 'react';
import useIndex from './useIndex';

jest.spyOn(React, 'useState').mockImplementation((val) => [
  val,
  (newValue) => {
    return newValue;
  },
]);

describe('useIndex', () => {
  it('should return first parameter as expanded', () => {
    expect(useIndex(1)).toHaveProperty('active', 1);
  });

  it('should return new value', () => {
    const { handleChange } = useIndex();
    expect(handleChange(4)(null, true)).toBe(4);
  });

  it('should return default (nullish) value', () => {
    const { handleChange } = useIndex();
    expect(handleChange(4)(null, false)).toBe(-1);
  });
});

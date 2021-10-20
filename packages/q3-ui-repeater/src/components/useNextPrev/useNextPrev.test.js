import React from 'react';
import useNextPrev, {
  findIndexById,
  findByIndex,
} from './useNextPrev';

const data = Array.from({ length: 5 }).map((_, i) => ({
  id: String(i + 1),
}));

beforeAll(() => {
  jest.spyOn(React, 'useContext').mockReturnValue({
    data,
  });
});

describe('useNextPrev', () => {
  describe('findByIndex', () => {
    it('should return empty', () => {
      expect(findByIndex({}, null)).toBeNull();
      expect(findByIndex(data, 9)).toBeNull();
    });

    it('should return item', () => {
      expect(findByIndex(data, 1)).toMatchObject({
        id: '2',
      });
    });
  });

  describe('findIndexById', () => {
    it('should return empty', () => {
      expect(findIndexById({}, null)).toBe(-1);
      expect(findIndexById(data, 9)).toBe(-1);
    });

    it('should return item', () => {
      expect(findIndexById(data, 2)).toBe(1);
    });
  });

  it('should return next', () => {
    expect(useNextPrev(3).next()).toBe('4');
  });

  it('should return last', () => {
    expect(useNextPrev(1).prev()).toBe(String(data.length));
  });

  it('should return prev', () => {
    expect(useNextPrev(3).prev()).toBe('2');
  });

  it('should return first', () => {
    expect(useNextPrev(data.length).next()).toBe(String(1));
  });
});

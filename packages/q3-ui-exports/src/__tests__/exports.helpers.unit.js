import { getData } from '../helpers';

const mutator = (v) => v.toUpperCase();

const seed = [
  {
    key1: 'foo',
    key2: 'bar',
  },
];

describe('DataToExcel', () => {
  describe('"getData"', () => {
    it('should map value by title', () => {
      const columns = getData(seed, mutator);

      expect(columns).toEqual([
        expect.arrayContaining([
          expect.objectContaining({ value: 'foo' }),
          expect.objectContaining({ value: 'bar' }),
        ]),
      ]);
    });
  });
});

import { getTags } from './Chips';

describe('Chips', () => {
  describe('"getTags"', () => {
    it('should get matching labels', () => {
      expect(
        getTags(
          [{ value: 'bar' }],
          [
            {
              value: 'foo',
            },
            {
              label: 'Bar',
              value: 'bar',
            },
            {
              value: 'quuz',
            },
          ],
        ),
      ).toEqual(['foo', 'Bar']);
    });
  });
});

import { toCsv } from './useRow';

describe('toCsv', () => {
  describe('toCsv', () => {
    it('should flatten and alphabetize the array', () => {
      const out = toCsv(
        [
          {
            foo: 1,
            bar: {
              quuz: 1,
              thunk: 1,
            },
          },
          {
            foo: 2,
            bar: {
              quuz: 2,
              thunk: 2,
            },
          },
        ],
        // drop in for trans func
        (v) => v,
      );

      expect(out).toMatch(
        'bar.quuz,bar.thunk,foo\n1,1,1\n2,2,2',
      );
    });

    it('should populate missing keys', () => {
      const out = toCsv(
        [
          {
            foo: 1,
            bar: 1,
            quuz: 1,
          },
          {
            foo: 2,
            thunk: 2,
            garply: [
              {
                baz: 2,
              },
            ],
          },
        ],
        // drop in for trans func
        (v) => v,
      );

      expect(out).toMatch(
        'bar,foo,garply.0.baz,quuz,thunk\n1,1,,1,\n,2,2,,2',
      );
    });

    it.skip('should escape commas', () => {
      const out = toCsv(
        [
          {
            foo: 'Hello, world',
          },
          {
            bar: ['1', '2', '3'],
          },
        ],
        // drop in for trans func
        (v) => v,
      );

      expect(out).toMatch(
        'bar.0,bar.1,bar.2,foo\n,,,Hello"," World\n1,2,3,',
      );
    });
  });
});

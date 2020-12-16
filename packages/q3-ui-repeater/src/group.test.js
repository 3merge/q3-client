import { list } from '../__fixtures__/seed/rows';
import { group } from './helper';
// { id: 1, name: 'g' },
// { id: 2, name: 'e' },
// { id: 3, name: 'f' },

// option = { label, key, fn}
export const isEven = (x) => x.id % 2 === 0;

test('should group by id', () => {
  expect(
    group({ label: 'Evens', fn: isEven }, list),
  ).toEqual({
    Evens: [{ id: 2, name: 'e' }],
    rest: [
      { id: 1, name: 'g' },
      { id: 3, name: 'f' },
    ],
  });
});

import { list } from '../__fixtures__/seed/rows';
// { id: 1, name: 'g' },
// { id: 2, name: 'e' },
// { id: 3, name: 'f' },

// option = { label, key, fn}
export const isEven = (x) => x.id % 2 === 0;

export const group = ({ label, fn }, xs) =>
  xs.reduce(
    (acc, x) => {
      // eslint-disable-next-line mdx/no-unused-expressions
      fn(x) ? acc[label].push(x) : acc.rest.push(x);
      return acc;
    },
    { [label]: [], rest: [] },
  );

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

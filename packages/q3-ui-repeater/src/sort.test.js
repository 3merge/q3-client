import { list } from '../__fixtures__/seed/rows';

export const sort = ({ sortBy, customFn = null }, xs) => {
  const callback =
    typeof xs[0][sortBy] === 'string'
      ? customFn ||
        ((a, b) => a[sortBy].localeCompare(b[sortBy]))
      : customFn || ((a, b) => a[sortBy] - b[sortBy]);

  return xs.slice().sort(callback);
};

test('should sort by number', () => {
  expect(sort({ sortBy: 'id' }, list)).toEqual([
    { id: 1, name: 'g' },
    { id: 2, name: 'e' },
    { id: 3, name: 'f' },
  ]);
});

test('should sort by number using customFun', () => {
  const customFn = (a, b) => b.id - a.id;

  expect(sort({ sortBy: 'id', customFn }, list)).toEqual([
    { id: 3, name: 'f' },
    { id: 2, name: 'e' },
    { id: 1, name: 'g' },
  ]);
});

test('should sort by string', () => {
  expect(sort({ sortBy: 'name' }, list)).toEqual([
    { id: 2, name: 'e' },
    { id: 3, name: 'f' },
    { id: 1, name: 'g' },
  ]);
});

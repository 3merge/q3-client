import { list } from '../__fixtures__/seed/rows';
import { sort } from './helper';

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

import { list } from '../__fixtures__/seed/rows';
import { group, sort } from './helper';

test('should group data', () => {
  const groupBy = { label: 'F', fn: (x) => x.name === 'f' };
  expect(group(groupBy)(list)).toEqual({
    F: [{ id: 3, name: 'f' }],
    other: [
      { id: 1, name: 'g' },
      { id: 2, name: 'e' },
    ],
  });
});

test.only('should everything is in "other"', () => {
  const groupBy = {
    label: 'F',
    fn: (x) => typeof x.name === 'object',
  };
  expect(group(groupBy)(list)).toEqual({
    F: [],
    other: [
      { id: 1, name: 'g' },
      { id: 3, name: 'f' },
      { id: 2, name: 'e' },
    ],
  });
});

test('should sort by number', () => {
  expect(sort({ sortBy: 'id' })(list)).toEqual([
    { id: 1, name: 'g' },
    { id: 2, name: 'e' },
    { id: 3, name: 'f' },
  ]);
});

test('should sort by number using customFun', () => {
  const fn = (a, b) => b.id - a.id;

  expect(sort({ sortBy: 'id', fn })(list)).toEqual([
    { id: 3, name: 'f' },
    { id: 2, name: 'e' },
    { id: 1, name: 'g' },
  ]);
});

test('should sort by string', () => {
  expect(sort({ sortBy: 'name' })(list)).toEqual([
    { id: 2, name: 'e' },
    { id: 3, name: 'f' },
    { id: 1, name: 'g' },
  ]);
});

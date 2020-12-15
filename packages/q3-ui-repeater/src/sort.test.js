import { compose } from 'lodash/fp';
import { list } from '../__fixtures__/seed/rows';

const myFunc = ({ label, customFn = null }) => (xs) => {
  const callback =
    typeof xs[0][label] === 'string'
      ? customFn ||
        ((a, b) => a[label].localeCompare(b[label]))
      : customFn || ((a, b) => a[label] - b[label]);

  return xs.slice().sort(callback);
};

export const _sort = myFunc;

const customSort = (listOfOptions, xs) => {
  const fns = listOfOptions.reverse().map(_sort);
  const composed = compose(...fns);
  return composed(xs);
};

test('should sort by number', () => {
  expect(_sort({ label: 'id' })(list)).toEqual([
    { id: 1, name: 'g' },
    { id: 2, name: 'e' },
    { id: 3, name: 'f' },
  ]);
});

test('should sort by string', () => {
  expect(_sort({ label: 'name' })(list)).toEqual([
    { id: 2, name: 'e' },
    { id: 3, name: 'f' },
    { id: 1, name: 'g' },
  ]);
});

test('should sort by array of options', () => {
  const options = [{ label: 'id' }, { label: 'name' }];

  const extendedList = list.concat([
    { name: 'g', id: 5 },
    { name: 'g', id: -1 },
  ]);

  expect(customSort(options, extendedList)).toEqual([
    { name: 'e', id: 2 },
    { name: 'f', id: 3 },
    { name: 'g', id: -1 },
    { name: 'g', id: 1 },
    { name: 'g', id: 5 },
  ]);
});

test('should sort by array of options', () => {
  const customFn = (a, b) => {
    return b.id - a.id;
  };

  const options = [
    { label: 'id', customFn },
    { label: 'name' },
  ];

  const extendedList = list.concat([
    { name: 'g', id: 5 },
    { name: 'g', id: -1 },
  ]);

  expect(customSort(options, extendedList)).toEqual([
    { name: 'e', id: 2 },
    { name: 'f', id: 3 },
    { name: 'g', id: 5 },
    { name: 'g', id: 1 },
    { name: 'g', id: -1 },
  ]);
});

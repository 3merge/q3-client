import { list } from '../__fixtures__/seed/rows';
import {
  checkValues,
  haveLength,
  group,
  sort,
  genNewShape,
} from './helper';

const isName = (y) => (x) => x.name === y;

test.each([
  [[], null, false],
  [{}, 'foo', false],
  ['here', [], false],
  [['john'], ['doe'], true],
])(
  'should check if all arrays have length',
  (arg1, arg2, result) => {
    expect(haveLength(arg1, arg2)).toBe(result);
  },
);

test.each([
  [[], []],
  [[], {}],
])('should return false', (xs, ys) => {
  expect(checkValues(xs, ys)).toBeFalsy();
});

test('should create groups', () => {
  const groupBy = [
    { label: 'Left', fn: () => {} },
    { label: 'Right', fn: () => {} },
  ];
  expect(genNewShape(groupBy)).toEqual({
    other: [],
    Left: [],
    Right: [],
  });
});

test('should group data', () => {
  const groupBy = [{ label: 'F', fn: isName('f') }];
  expect(group(groupBy)(list)).toEqual({
    F: [{ id: 3, name: 'f' }],
    other: [
      { id: 1, name: 'g' },
      { id: 2, name: 'e' },
    ],
  });
});

test('should divide into multiple groups', () => {
  const groupBy = [
    { label: 'Left', fn: isName('e') },
    { label: 'Right', fn: isName('g') },
  ];
  expect(group(groupBy)(list)).toEqual({
    Left: [{ id: 2, name: 'e' }],
    Right: [{ id: 1, name: 'g' }],
    other: [{ id: 3, name: 'f' }],
  });
});

test('should everything is in "other"', () => {
  const groupBy = [
    {
      label: 'F',
      fn: (x) => typeof x.name === 'object',
    },
  ];
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
  expect(sort({ label: 'id' })(list)).toEqual([
    { id: 1, name: 'g' },
    { id: 2, name: 'e' },
    { id: 3, name: 'f' },
  ]);
});

test('should sort by number using customFun', () => {
  const fn = (a, b) => b.id - a.id;

  expect(sort({ label: 'id', fn })(list)).toEqual([
    { id: 3, name: 'f' },
    { id: 2, name: 'e' },
    { id: 1, name: 'g' },
  ]);
});

test('should sort by string', () => {
  expect(sort({ label: 'name' })(list)).toEqual([
    { id: 2, name: 'e' },
    { id: 3, name: 'f' },
    { id: 1, name: 'g' },
  ]);
});

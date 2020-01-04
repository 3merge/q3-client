import {
  findNestedExpressions,
  transformDelineatedStringIntoArray,
  intersects,
} from '../transfer';

test('findNestedExpressions should separate regex from string', () => {
  expect(
    findNestedExpressions(['FOO', '((BAR).*)']),
  ).toEqual([['((BAR).*)'], ['FOO']]);
});

test('transformDelineatedString should return array', () => {
  expect(
    transformDelineatedStringIntoArray('foo, bar'),
  ).toEqual(['foo', 'bar']);
});

test('intersects should filter and merge two arrays', () => {
  expect(
    intersects(
      ['foo', 'bar'],
      ['hello', 'dolly'],
      ['foo', 'hello'],
    ),
  ).toEqual([
    ['bar', 'hello'],
    ['dolly', 'foo'],
  ]);
});

import {
  findNestedExpressions,
  transformDelineatedString,
  filterByExpressions,
  intersects,
} from '.';

test('findNestedExpressions should separate regex from string', () => {
  expect(
    findNestedExpressions(['FOO', '((BAR).*)']),
  ).toEqual([['((BAR).*)'], ['FOO']]);
});

test('transformDelineatedString should return array', () => {
  expect(transformDelineatedString('foo, bar')).toEqual([
    'foo',
    'bar',
  ]);
});

test('filterByExpressions should test a string against all expressions', () => {
  const fn = filterByExpressions([
    '^((?!marg).)*$',
    '(sanc+)',
  ]);
  expect(fn('sanches')).toBeTruthy();
  expect(fn('marg')).toBeFalsy();
});

test('intersects should filter and merge two arrays', () => {
  expect(
    intersects(
      ['foo', 'bar'],
      ['hello', 'dolly'],
      ['foo', 'hello'],
    ),
  ).toEqual([['bar', 'hello'], ['dolly', 'foo']]);
});

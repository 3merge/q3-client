import useQueryOp, {
  replaceTimestamp,
  replaceWorkaroundCharacters,
} from './useQueryOp';

test.each([
  [['foo!', 'string(bar)'], 'doesNotEqual'],
  [['foo!', 'in(bar)'], 'doesNotInclude'],
  [['foo', 'has(true)'], 'has'],
  [['foo', 'has(false)'], 'hasNot'],
  [['foo', 'exists(true)'], 'exists'],
  [['foo', 'exists(false)'], 'doesNotExist'],
  [['foo<', '10'], 'lessThan'],
  [['foo>', '10'], 'moreThan'],
  [['foo'], 'has'],
  [['!foo'], 'hasNot'],
  [['foo', '10'], 'equals'],
])(
  '.useQueryOp(%a) should return %s',
  (args, expectedQueryString) =>
    expect(useQueryOp()(...args)).toMatch(
      expectedQueryString,
    ),
);

test.each([
  ['2020-01-06T15:12:07.855+00:00', '2020-01-06'],
  ['"unwrap"', 'unwrap'],
])(
  '.replaceTimestamp(%s) should return %s',
  (args, expected) =>
    expect(replaceTimestamp(args)).toEqual(expected),
);

test.each([
  ['foo~bar', 'foo.bar'],
  ['more>', 'more'],
  ['less<', 'less'],
])(
  '.replaceWorkaroundCharacters(%s) should return %s',
  (args, expected) =>
    expect(replaceWorkaroundCharacters(args)).toEqual(
      expected,
    ),
);

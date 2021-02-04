import { parseOp } from './utils';

test.each([
  [['foo!', 'string(bar)'], 'doesNotEqual'],
  [['foo!', 'in(bar)'], 'doesNotInclude'],
  [['foo', 'has(true)'], 'has'],
  [['foo', 'has(false)'], 'hasNot'],
  [['foo', 'exists(true)'], 'exists'],
  [['foo', 'exists(false)'], 'doesNotExist'],
  [['foo<', '10'], 'lessThan'],
  [['foo>', '10'], 'moreThan'],
  [['foo!'], 'has'],
  [['!foo'], 'hasNot'],
  [['foo', '10'], 'equals'],
])(
  '.parseOp(%a) should return %s',
  (args, expectedQueryString) =>
    expect(parseOp(args)).toEqual(expectedQueryString),
);

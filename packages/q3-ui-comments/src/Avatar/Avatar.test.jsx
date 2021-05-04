import { makeName } from './Avatar';

test.each([
  [{ firstName: 'Jon' }, 'Jon'],
  [{ firstName: 'Jon', lastName: 'Snow' }, 'Jon Snow'],
  [{}, 'Anonymous'],
])('.makeName()', (a, expected) => {
  expect(makeName(a)).toBe(expected);
});

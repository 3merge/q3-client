import { addTrailingSlash } from './useServerSideEvents';

describe.each([
  ['localhost', 'localhost/'],
  ['localhost/', 'localhost/'],
])('.addTrailingSlash(%s)', (a, expected) => {
  test(`returns ${expected}`, () =>
    expect(addTrailingSlash(a)).toBe(expected));
});

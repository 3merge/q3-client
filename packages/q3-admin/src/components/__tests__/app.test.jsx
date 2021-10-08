import { first } from 'lodash';
import {
  addRedirectWhenMissingHome,
  makePath,
} from '../app';

const component = () => null;

const stub = {
  index: true,
  component,
};

describe('makePath', () => {
  test.each([
    [{ home: true }, '/'],
    [{ index: true, resourceName: 'users' }, 'users'],
    [{ id: true, resourceName: 'users' }, 'users/:id/*'],
  ])('.makePath(%o)', (a, expected) => {
    expect(makePath(a)).toBe(expected);
  });

  it('should error', () => {
    expect(() => makePath({})).toThrowError();
  });
});

describe('addRedirectWhenMissingHome', () => {
  it('should add redirect', () => {
    const output = addRedirectWhenMissingHome([stub]);

    expect(output).toHaveLength(2);
    expect(first(output)).toHaveProperty('home', true);
  });

  it('should do nothing', () => {
    const output = addRedirectWhenMissingHome([
      {
        home: true,
        component,
      },
      stub,
    ]);

    // don't add anything
    expect(output).toHaveLength(2);
  });
});

import React from 'react';
import { Button } from '@material-ui/core';
import NavigationLink, {
  makeAnchor,
  toggleSelectedClass,
} from './NavigationLink';

const callEventHandler = (href) => {
  const preventDefault = jest.fn();
  const toggle = jest.fn();

  toggleSelectedClass(href)({
    preventDefault,
    currentTarget: {
      classList: {
        toggle,
      },
    },
  });

  return {
    preventDefault,
    toggle,
  };
};

describe('NavigationLink', () => {
  it('should anchor', () =>
    expect(makeAnchor(undefined)).toMatch('#'));

  it('should return self', () =>
    expect(makeAnchor('/active')).toMatch('/active'));

  it('should call event methods', () => {
    const { preventDefault, toggle } = callEventHandler(
      undefined,
    );

    expect(preventDefault).toHaveBeenCalled();
    expect(toggle).toHaveBeenCalled();
  });

  it('should not call event methods', () => {
    const { preventDefault, toggle } = callEventHandler(
      '/active',
    );

    expect(preventDefault).not.toHaveBeenCalled();
    expect(toggle).not.toHaveBeenCalled();
  });
});

test.each([
  ['/foo', { isCurrent: true }, 'active'],
  ['/foo', { isPartiallyCurrent: true }, 'active'],
  [undefined, { isCurrent: true }, 'anchor'],
  [undefined, { isPartiallyCurrent: true }, 'anchor'],
  ['/foo', { includesPartiallyCurrent: true }, 'parent'],
])('NavigationLink getProps', (to, props, expected) => {
  const out = global
    .shallow(
      <NavigationLink {...props} label="test" to={to} />,
    )
    .find(Button)
    .props()
    .getProps(props);

  expect(out.className).toMatch(expected);
});

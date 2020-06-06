import React from 'react';
import withLength from './withLength';

const Component = withLength(
  ({ foo }) => foo.map((name) => <div key={name} />),
  'foo',
);

const getLength = (el, expectedLength) =>
  expect(el.find('div')).toHaveLength(expectedLength);

describe('withLength', () => {
  it('should block rendering without an array', () => {
    const el = global.mount(<Component />);
    getLength(el, 0);
  });

  it('should forward all props', () => {
    const el = global.mount(<Component foo={[1, 2]} />);
    getLength(el, 2);
  });
});

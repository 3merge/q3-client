import React from 'react';
import withValues from './withValues';

const El = withValues(
  ({ children }) => <div id="parent">{children}</div>,
  () => <div id="child" />,
);

test.each([
  [['foo', 'bar'], 2],
  ['foo', 1],
])('.withValues(%s, %i)', (valueProp, expected) => {
  expect(
    global
      .mount(<El colours={[]} value={valueProp} />)
      .find('#child'),
  ).toHaveLength(expected);
});

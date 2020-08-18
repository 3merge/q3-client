import React from 'react';
import Header from './Header';

const getSubNavContainer = (props, expectLength) =>
  expect(
    global
      .shallow(<Header title="test" {...props} />)
      .find('#q3-app-subnav'),
  ).toHaveLength(expectLength);

describe('Admin>Header', () => {
  it('should not render navComponent', () =>
    getSubNavContainer({}, 0));

  it('should render navComponent', () =>
    getSubNavContainer(
      {
        navComponent: <div />,
      },
      1,
    ));
});

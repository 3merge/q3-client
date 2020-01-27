import React from 'react';
import ActionBar from '.';
import { DropDownMenu } from '../../../toolbar';

const ChildFn = () => null;

const makeAction = () => ({
  label: 'Action label placeholder',
  onClick: jest.fn(),
});

const measureDropDownLength = (props, length) =>
  expect(
    global
      .shallow(<ActionBar {...props} />)
      .find(DropDownMenu),
  ).toHaveLength(length);

describe('List/ActionBar', () => {
  it('should render a dropdown', () =>
    measureDropDownLength({ actions: [makeAction()] }, 1));

  it('should not render a dropdown', () =>
    measureDropDownLength({}, 0));

  it('should render children', () =>
    expect(
      global
        .shallow(
          <ActionBar>
            <ChildFn />
          </ActionBar>,
        )
        .find(ChildFn),
    ).toHaveLength(1));
});

import React from 'react';
import Button from '@material-ui/core/Button';
import DrawerFooter from './DrawerFooter';

const stubContext = (args) =>
  jest.spyOn(React, 'useContext').mockReturnValue(args);

const getCheckoutButtonDisabledProp = () =>
  global
    .shallow(<DrawerFooter close={jest.fn()} />)
    .find(Button)
    .first()
    .props().disabled;

describe('DrawerFooter', () => {
  it('should render checkout as disabled', () => {
    stubContext({});
    expect(getCheckoutButtonDisabledProp()).toBeTruthy();
  });

  it('should render a button given the context context', () => {
    stubContext({ items: [1, 2, 3] });
    expect(getCheckoutButtonDisabledProp()).toBeFalsy();
  });

  it('should not render on error', () => {
    stubContext({ hasError: true });
    expect(
      global
        .shallow(<DrawerFooter close={jest.fn()} />)
        .find(Button),
    ).toHaveLength(0);
  });
});

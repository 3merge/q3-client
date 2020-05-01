import React from 'react';
import { EditableTypography } from 'q3-components';
import DrawerTitle from './DrawerTitle';

jest.mock('q3-components', () => ({
  EditableTypography: jest.fn(),
}));

jest.mock('./useStyle', () =>
  jest.fn().mockReturnValue({}),
);

const stubContext = (args) =>
  jest.spyOn(React, 'useContext').mockReturnValue(args);

const getEditableProp = () =>
  global
    .shallow(<DrawerTitle />)
    .find(EditableTypography)
    .props().isEditable;

const getTitleText = (props) =>
  global
    .shallow(<DrawerTitle {...props} />)
    .find(EditableTypography)
    .props().children;

describe('DrawerTitle', () => {
  it('should mark as non-editable without items', () => {
    stubContext({ updateOrder: jest.fn(), items: [] });
    expect(getEditableProp()).toBeFalsy();
  });

  it('should mark as non-editable without update fn', () => {
    stubContext({ items: [1, 2] });
    expect(getEditableProp()).toBeFalsy();
  });

  it('should mark as editable', () => {
    stubContext({ updateOrder: jest.fn(), items: [1, 2] });
    expect(getEditableProp()).toBeTruthy();
  });

  it('should render default title', () => {
    stubContext({ foo: { bar: 'Located' } });
    expect(getTitleText()).toMatch('cart');
  });

  it('should render matched title prop', () => {
    stubContext({ foo: { bar: 'Located' } });
    expect(getTitleText({ titleKey: 'foo.bar' })).toMatch(
      'Located',
    );
  });
});

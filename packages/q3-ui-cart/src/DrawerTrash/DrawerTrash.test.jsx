import React from 'react';
import IconButton from 'q3-ui/lib/iconButton';
import Trash from './DrawerTrash';

jest.mock('./useStyle', () =>
  jest.fn().mockReturnValue({}),
);

const stubContext = (clear) =>
  jest.spyOn(React, 'useContext').mockReturnValue({
    clear,
  });

const getRendererTrashIconButton = () =>
  global.shallow(<Trash />).find(IconButton);

describe('Trash', () => {
  it('should render nothing without context', () => {
    stubContext(null);
    expect(getRendererTrashIconButton()).toHaveLength(0);
  });

  it('should render a button given the context context', () => {
    stubContext(jest.fn());
    expect(getRendererTrashIconButton()).toHaveLength(1);
  });
});

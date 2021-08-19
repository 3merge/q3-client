import React from 'react';
import Draggable from 'react-draggable';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DialogDraggable from './draggable';

jest.mock('@material-ui/core/useMediaQuery');

describe('DialogDraggable', () => {
  it('should render only Paper', () => {
    useMediaQuery.mockReturnValue(false);

    expect(
      global
        .shallow(<DialogDraggable />)
        .find(Draggable)
        .exists(),
    ).toBeFalsy();
  });

  it('should render Draggable', () => {
    useMediaQuery.mockReturnValue(true);

    expect(
      global
        .shallow(<DialogDraggable />)
        .find(Draggable)
        .exists(),
    ).toBeTruthy();
  });
});

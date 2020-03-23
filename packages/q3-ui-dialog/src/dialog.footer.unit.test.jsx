import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import DialogFooter from './footer';

describe('DialogFooter', () => {
  it('should nullish without onPrev and onNext funcs', () => {
    const footer = global.shallow(<DialogFooter />);
    expect(footer).toEqual({});
  });

  it('should nullish without onPrev and onNext funcs', () => {
    const nav = global
      .shallow(
        <DialogFooter
          onNext={jest.fn()}
          onPrev={jest.fn()}
        />,
      )
      .find(BottomNavigation).length;
    expect(nav).toBe(1);
  });
});

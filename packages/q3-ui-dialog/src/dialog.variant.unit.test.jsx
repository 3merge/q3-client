import React from 'react';
import DialogVariant from './variant';

const props = {
  onExit: jest.fn(),
  onClose: jest.fn(),
  onOpen: jest.fn(),
  isOpen: false,
};

describe('DialogVariant', () => {
  it('should nullish without onPrev and onNext funcs', () => {
    const el = global.shallow(
      <DialogVariant variant="modal" {...props}>
        <div />
      </DialogVariant>,
    );

    expect(el.name()).toMatch('Dialog');
  });

  it('should nullish without onPrev and onNext funcs', () => {
    const el = global.shallow(
      <DialogVariant variant="drawer" {...props}>
        <div />
      </DialogVariant>,
    );

    expect(el.name()).toMatch('Drawer');
  });
});

import React from 'react';
import Popover from './Popover';

jest.mock('useful-state', () => ({
  useToggle: jest.fn().mockReturnValue({
    toggle: jest.fn(),
  }),
}));

describe('Popover', () => {
  it('should attach click handler to the anchor', () => {
    const Anchor = jest
      .fn()
      .mockImplementation(() => <div />);
    const el = global.shallow(
      <Popover anchorComponent={<Anchor />}>
        <div />
      </Popover>,
    );

    expect(el.find(Anchor).props()).toHaveProperty(
      'onClick',
      expect.any(Function),
    );
  });
});

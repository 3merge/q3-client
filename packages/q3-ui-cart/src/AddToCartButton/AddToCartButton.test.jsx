import React from 'react';
import Button from '@material-ui/core/Button';
import AddToCartButton from './AddToCartButton';

jest.mock('./useStyle', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({}),
  getFromProps: jest.fn().mockReturnValue({
    icon: () => null,
    label: 'addToCart',
  }),
}));

jest.spyOn(React, 'useContext').mockReturnValue({
  add: jest.fn().mockReturnValue(Promise.resolve()),
});

describe('AddToCartButton', () => {
  it('should be disabled when quantity is less than 1', () => {
    expect(
      global
        .shallow(
          <AddToCartButton quantity={0} product="abcd" />,
        )
        .find(Button)
        .props(),
    ).toHaveProperty('disabled', true);
  });

  it('should be disabled when loading', () => {
    const setState = jest.fn();
    jest
      .spyOn(React, 'useState')
      .mockImplementation(() => [true, setState]);

    const el = global.shallow(
      <AddToCartButton quantity={1} product="abcd" />,
    );

    const btn = el.find(Button).props();
    btn.onClick();

    expect(setState).toHaveBeenCalledWith(true);
    expect(btn).toHaveProperty('disabled', true);
  });
});

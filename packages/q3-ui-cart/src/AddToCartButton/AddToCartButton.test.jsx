import React from 'react';
import Button from '@material-ui/core/Button';
import AddToCartButton from './AddToCartButton';

jest.spyOn(React, 'useContext').mockReturnValue({
  add: jest.fn().mockReturnValue({
    catch: jest.fn().mockReturnValue({
      finally: jest.fn(),
    }),
  }),
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

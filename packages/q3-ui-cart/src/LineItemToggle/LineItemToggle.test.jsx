import React from 'react';
import { Quantity } from 'q3-components';
import LineItemToggle, {
  getValueFromParam,
} from './LineItemToggle';

const getStub = () => ({
  id: '123',
  product: 'abc',
  quantity: 1,
});

const stubContext = (args) =>
  jest.spyOn(React, 'useContext').mockReturnValue(args);

const getQuantityField = () =>
  global
    .shallow(<LineItemToggle {...getStub()} />)
    .find(Quantity)
    .props();

describe('LineItemToggle', () => {
  it('should disable the quantity field on load', () => {
    stubContext({ loading: true });
    expect(getQuantityField()).toHaveProperty(
      'disabled',
      true,
    );
  });

  it('should get the event value', () => {
    expect(
      getValueFromParam({ target: { value: 12 } }),
    ).toBe(12);
  });

  it('should return just the number', () => {
    expect(getValueFromParam(12)).toBe(12);
  });

  it('should disable the quantity field on load', () => {
    const update = jest.fn();
    stubContext({
      update,
    });

    getQuantityField().onBlur({
      target: {
        value: 19,
      },
    });

    expect(update).toHaveBeenCalled();
  });

  it('should disable the quantity field on load', () => {
    const remove = jest.fn();
    stubContext({
      remove,
    });

    getQuantityField().onQuantityChange(0);
    expect(remove).toHaveBeenCalled();
  });
});

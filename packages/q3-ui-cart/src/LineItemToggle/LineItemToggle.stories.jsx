import React from 'react';
import { actions } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import { CartContext } from '../context';
import LineItemToggle from './LineItemToggle';

export default {
  title: 'Cart|LineItem/Toggle',
  decorators: [withA11y],
};

const callbacks = actions({
  update: 'updated',
  remove: 'removed',
});

export const withUpdate = () => {
  const [loading, setLoading] = React.useState();

  const simulatedNetworkResponse = (eventName) => (
    values,
  ) =>
    new Promise((resolve) => {
      setLoading(true);
      setTimeout(() => resolve(values), 500);
    }).then((r) => {
      callbacks[eventName](r);
      setLoading(false);
    });

  return (
    <CartContext.Provider
      value={{
        remove: simulatedNetworkResponse('remove'),
        update: simulatedNetworkResponse('update'),
        loading,
      }}
    >
      <LineItemToggle id="123" product="abc" quantity={3} />
    </CartContext.Provider>
  );
};

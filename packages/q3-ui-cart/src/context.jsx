import React from 'react';
import PropTypes from 'prop-types';

const contextDefaults = {
  items: [],
  subtotal: 0,
  total: 0,
};

export const CartContext = React.createContext(
  contextDefaults,
);

const CartProvider = ({
  children,
  addItemToOrder,
  updateItemInOrder,
  removeItemInOrder,
  pollOrder,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [state, setState] = React.useState(contextDefaults);

  const re = (service) => (...args) => {
    setLoading(true);

    return service(...args)
      .then(() => {
        return pollOrder();
      })
      .then((response) => {
        setState(response);
        return response;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        loading,
        add: re(addItemToOrder),
        remove: re(removeItemInOrder),
        update: re(updateItemInOrder),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
  addItemToOrder: PropTypes.func.isRequired,
  updateItemInOrder: PropTypes.func.isRequired,
  removeItemInOrder: PropTypes.func.isRequired,
  pollOrder: PropTypes.func.isRequired,
};

export default CartProvider;

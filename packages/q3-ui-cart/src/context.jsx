import React from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from 'q3-ui-permissions';

const contextDefaults = {
  clear: null,
  update: null,
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
  updateOrder,
  clear,
  ...rest
}) => {
  const [loading, setLoading] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const [state, setState] = React.useState(contextDefaults);
  const auth = React.useContext(AuthContext);

  const processPromise = (p) => {
    if (!p) return null;

    setLoading(true);
    return p
      .then((response) => {
        setState(response);
        return response;
      })
      .catch((e) => {
        setHasError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const re = (service) => (...args) =>
    processPromise(
      service(...args)
        .then(() => pollOrder())
        .catch((e) => {
          setHasError(e);
        }),
    );

  const poll = () => processPromise(pollOrder());

  React.useEffect(() => {
    if (auth && auth.state && auth.state.init) poll();
  }, [auth]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        ...rest,
        loading,
        hasError,
        add: re(addItemToOrder),
        remove: re(removeItemInOrder),
        update: re(updateItemInOrder),
        updateOrder: updateOrder
          ? (...args) =>
              processPromise(updateOrder(...args))
          : null,
        clear: (...args) => processPromise(clear(...args)),
        poll,
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

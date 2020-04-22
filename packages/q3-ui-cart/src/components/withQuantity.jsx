/** eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { CartContext } from '../context';

export default (Component) => ({
  quantity = 1,
  product,
  ...etc
}) => {
  const disabled = quantity <= 0;
  const { add } = React.useContext(CartContext);
  const [loading, setLoading] = React.useState(false);

  const onClick = React.useCallback(() => {
    setLoading(true);
    return add({
      product,
      quantity,
    }).finally(() => {
      setLoading(false);
    });
  }, [quantity]);

  return (
    <Component
      quantity={quantity}
      product={product}
      onClick={onClick}
      disabled={disabled}
      loading={loading}
      {...etc}
    />
  );
};

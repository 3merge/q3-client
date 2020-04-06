/** eslint-disable react/jsx-no-duplicate-props */
import React from 'react';
import { useTranslation } from 'react-i18next';

export const addBy = (qty) => qty + 1;
export const reduceBy = (qty) => (qty > 0 ? qty - 1 : 0);

export default () => {
  const { t } = useTranslation();
  const [quantity, setQuantity] = React.useState(1);
  const [message, setMessage] = React.useState('');
  const [hasError, setError] = React.useState();

  const handleQuantity = ({ target: { value } }) => {
    const num = Number(value);
    setQuantity(num === 0 ? '' : num);
    setError(num < 0);
  };

  const reset = ({ target: { value } }) => {
    if (!value) setQuantity(1);
  };

  const increase = React.useCallback(
    () => setQuantity(addBy(quantity)),
    [quantity],
  );

  const decrease = React.useCallback(
    () => setQuantity(reduceBy(quantity)),
    [quantity],
  );

  React.useEffect(() => {
    setMessage(
      hasError
        ? t('helpers:moreThan1')
        : t('helpers:quantity'),
    );
  }, [hasError]);

  return {
    decrease,
    handleQuantity,
    hasError,
    increase,
    quantity,
    message,
    reset,
  };
};

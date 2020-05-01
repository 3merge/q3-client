import React from 'react';
import { useTranslation } from 'react-i18next';
import { object } from 'q3-ui-helpers';

export const addBy = (qty) => Number(qty) + 1;

export const reduceBy = (qty, minimum = 0) =>
  qty > minimum ? Number(qty) - 1 : minimum;

export const clamp = (qty, threshold) =>
  qty > threshold ? qty : threshold;

/**
 * @TODO
 * Rest
 * On Zero
 */

export default ({
  defaultValue,
  minimum,
  onMinimum,
  onQuantityChange,
}) => {
  const { t } = useTranslation();
  const [quantity, setQuantity] = React.useState(0);

  const [message, setMessage] = React.useState('');
  const [hasError, setError] = React.useState();

  const runEventHandlers = (
    newValue,
    hasTriggeredThreshold,
  ) => {
    if (hasTriggeredThreshold && object.isFn(onMinimum))
      onMinimum(newValue);
    if (object.isFn(onQuantityChange))
      onQuantityChange(newValue);
  };

  const checkMinimum = (newValue, done) => {
    const isBelow = newValue < minimum;
    setError(isBelow);
    setQuantity(newValue);

    if (newValue !== '' && object.isFn(done))
      done(newValue, isBelow);
  };

  const handleQuantity = ({ target: { value } }) => {
    const num = Number(value);
    checkMinimum(num === 0 ? '' : num);
  };

  const reset = React.useCallback(
    ({ target: { value } }) => {
      if (!value) setQuantity(defaultValue);
    },
    [],
  );

  const increase = React.useCallback(
    () => checkMinimum(addBy(quantity), runEventHandlers),
    [quantity],
  );

  const decrease = React.useCallback(
    () =>
      checkMinimum(
        reduceBy(quantity, minimum),
        runEventHandlers,
      ),
    [quantity],
  );

  React.useEffect(() => {
    setMessage(hasError ? t('helpers:moreThan1') : '');
  }, [hasError]);

  React.useEffect(() => {
    setQuantity(clamp(defaultValue, minimum));
  }, [defaultValue]);

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

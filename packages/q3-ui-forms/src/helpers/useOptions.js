/* eslint-disable no-return-assign */
import React from 'react';
import { useValue } from 'useful-state';
import { useFormikContext } from 'formik';

export default ({
  initialValue = '',
  initialStatus = false,
  options = [],
  loadOptions,
}) => {
  const [init, setInit] = React.useState(initialStatus);
  const [loading, setLoading] = React.useState(false);
  const [items, setItems] = React.useState(options);
  const { value, onChange } = useValue(initialValue);
  const { values } = useFormikContext();

  React.useEffect(() => {
    let cancel = false;

    if (typeof loadOptions !== 'function' || !init)
      return undefined;

    setLoading(true);
    loadOptions(value, values)
      .catch(() => [])
      .then((data) => {
        if (cancel) return;
        setItems(data);
        setLoading(false);
      });

    return () => (cancel = true);
  }, [init, value]);

  React.useEffect(() => {
    setInit(value !== initialValue);
  }, [value, initialValue]);

  return {
    loading,
    value,
    onChange,
    items,
  };
};

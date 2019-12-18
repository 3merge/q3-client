/* eslint-disable no-return-assign */
import React from 'react';
import { useValue } from 'useful-state';

export default ({
  options = [],
  loadOptions,
  initialValue,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [items, setItems] = React.useState(options);
  const { value, onChange } = useValue(initialValue);

  React.useEffect(() => {
    let cancel = false;
    if (typeof loadOptions !== 'function') return undefined;

    setLoading(true);
    loadOptions(value)
      .catch(() => [])
      .then((data) => {
        if (cancel) return;
        setItems(data);
        setLoading(false);
      });

    return () => (cancel = true);
  }, [value]);

  return {
    loading,
    value,
    onChange,
    items,
  };
};

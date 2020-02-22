/* eslint-disable no-return-assign */
import React from 'react';
import { pick } from 'lodash';
import { useValue } from 'useful-state';
import { useFormikContext } from 'formik';

export default ({
  runOnChange = false,
  initialValue = '',
  loadOptions,
  options = [],
}) => {
  const [loading, setLoading] = React.useState(false);
  const [items, setItems] = React.useState(options);
  const { value, onChange } = useValue(initialValue);
  const { values } = useFormikContext();
  let watchValues = runOnChange ? values : false;

  if (Array.isArray(runOnChange))
    watchValues = pick(values, runOnChange);

  React.useEffect(() => {
    let cancel = false;

    if (loadOptions) {
      setLoading(true);
      loadOptions(value, values)
        .catch(() => [])
        .then((data) => {
          if (cancel) return;
          setItems(data);
          setLoading(false);
        });
    } else {
      setItems(options);
    }

    return () => (cancel = true);
  }, [
    value,
    items !== options,
    JSON.stringify(watchValues),
  ]);

  return {
    loading,
    value,
    onChange,
    items,
  };
};

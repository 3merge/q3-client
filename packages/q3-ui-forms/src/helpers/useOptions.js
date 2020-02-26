/* eslint-disable no-return-assign */
import React from 'react';
import { pick } from 'lodash';
import { useValue } from 'useful-state';
import { useFormikContext } from 'formik';
import { asOptions } from '.';

export default ({
  runOnChange = false,
  transformOptions = false,
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

  const runOpts = (v) =>
    setItems(transformOptions ? asOptions(v) : v);

  React.useEffect(() => {
    let cancel = false;

    if (loadOptions) {
      setLoading(true);
      loadOptions(value, values)
        .catch(() => [])
        .then((data) => {
          if (cancel) return;
          runOpts(data);
          setLoading(false);
        });
    } else {
      runOpts(options);
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

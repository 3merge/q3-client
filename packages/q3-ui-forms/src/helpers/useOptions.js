/* eslint-disable no-return-assign */
import React from 'react';
import { pick } from 'lodash';
import { useValue } from 'useful-state';
import { useFormikContext } from 'formik';
import { useResults } from 'q3-ui-helpers/lib/hooks';
import { asOptions } from '.';

export default ({
  runOnChange = false,
  transformOptions = false,
  initialValue = '',
  loadOptions,
  options = [],
  minimumCharacterCount,
}) => {
  const { value, onChange } = useValue(initialValue);
  const { values } = useFormikContext();

  const {
    loading,
    run,
    results: items,
    setResults: setItems,
  } = useResults(
    loadOptions,
    [value, values],
    options,
    minimumCharacterCount,
  );

  let watchValues = runOnChange ? values : false;

  if (Array.isArray(runOnChange))
    watchValues = pick(values, runOnChange);

  const runOpts = (v) =>
    setItems(transformOptions ? asOptions(v) : v);

  React.useEffect(() => {
    if (loadOptions) {
      run(values);
    } else {
      runOpts(options);
    }
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

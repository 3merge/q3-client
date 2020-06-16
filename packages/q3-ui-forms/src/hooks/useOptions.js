/* eslint-disable no-return-assign */
import React from 'react';
import { pick } from 'lodash';
import { useValue } from 'useful-state';
import { useResults } from 'q3-ui-helpers/lib/hooks';
import { asOptions } from '../helpers';
import { BuilderState } from '../FormsContext';

export default ({
  runOnChange = false,
  transformOptions = false,
  initialValue = '',
  loadOptions,
  options = [],
  minimumCharacterCount,
}) => {
  const { values } = React.useContext(BuilderState);
  const { value, onChange, setValue } = useValue(
    initialValue,
  );

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
    let cancel;

    // exit early once options are defined
    if (!runOnChange && items.length) return undefined;

    if (loadOptions && !loading && !cancel) {
      run(values);
    } else {
      runOpts(options);
    }

    return () => {
      cancel = true;
    };
  }, [
    value,
    items !== options,
    JSON.stringify(watchValues),
  ]);

  return {
    loading,
    value,
    onChange,
    setValue,
    items,
  };
};

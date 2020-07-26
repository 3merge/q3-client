/* eslint-disable no-return-assign */
import React from 'react';
import { pick } from 'lodash';
import { useValue } from 'useful-state';
import { useResults } from 'q3-ui-helpers/lib/hooks';
import { array } from 'q3-ui-helpers';
import { useDebounce } from 'use-debounce';
import { asOptions } from '../helpers';
import { BuilderState } from '../FormsContext';
import { expandOptions } from '../fields/optionsThreshold';

export default ({
  runOnChange = false,
  transformOptions = false,
  preload = false,
  initialValue = '',
  loadOptions,
  options = [],
  minimumCharacterCount,
}) => {
  const { values } = React.useContext(BuilderState);
  const { value, onChange, setValue } = useValue(
    initialValue,
  );

  const [debounced] = useDebounce(value, 135, {
    maxWait: 450,
  });

  const {
    loading,
    run,
    results: items,
    setResults: setItems,
  } = useResults(
    loadOptions,
    debounced,
    expandOptions(options),
    minimumCharacterCount,
  );

  let watchValues = runOnChange ? values : false;

  if (Array.isArray(runOnChange))
    watchValues = pick(values, runOnChange);

  const runOpts = React.useCallback(
    (v) => setItems(transformOptions ? asOptions(v) : v),
    [transformOptions],
  );

  React.useEffect(() => {
    if (loadOptions) {
      if (!array.hasLength(items) && preload) {
        loadOptions(debounced).then(setItems);
      } else if (loadOptions && debounced && !preload) {
        run(values);
      }
    } else if (runOpts) {
      runOpts(options);
    }
  }, [debounced, JSON.stringify(watchValues)]);

  return {
    loading,
    value,
    onChange,
    setValue,
    items,
  };
};

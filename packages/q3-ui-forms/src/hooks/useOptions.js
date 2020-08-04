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

const formatFieldOptions = (items = []) =>
  array.hasLength(items)
    ? items.map((item) =>
        typeof item === 'string'
          ? {
              label: item,
              value: item,
            }
          : item,
      )
    : items;

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
    maxWait: 1150,
  });

  const {
    loading,
    run,
    invokeService,
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
    const shouldInit = () =>
      preload && !array.hasLength(items);

    if (loadOptions) {
      if (shouldInit() || runOnChange) {
        invokeService(values);
      } else if (debounced && !preload) {
        run(values);
      }
    } else if (runOpts) {
      runOpts(options);
    }
  }, [debounced, runOnChange, JSON.stringify(watchValues)]);

  return {
    items: formatFieldOptions(items),
    loading,
    value,
    onChange,
    setValue,
  };
};

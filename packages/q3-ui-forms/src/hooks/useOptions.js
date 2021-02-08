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
  loadOptionsPlainly = false,
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

  const [shouldRun, setShouldRun] = React.useState(false);

  const ref = React.useRef(null);

  React.useEffect(() => {
    let timer;
    if (!ref.current) {
      ref.current = true;
    } else {
      timer = setTimeout(() => setShouldRun(true), 350);
    }

    return () => {
      clearTimeout(timer);
      setShouldRun(false);
    };
  }, [value]);

  const {
    loading,
    run,
    invokeService,
    results: items,
    setResults: setItems,
  } = useResults(
    loadOptions,
    value,
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
      } else if (shouldRun && !preload) {
        run(values);
      }
    } else if (runOpts) {
      runOpts(options);
    }
  }, [shouldRun, JSON.stringify(watchValues)]);

  return {
    items: loadOptionsPlainly
      ? items
      : formatFieldOptions(items),
    loading,
    value,
    onChange,
    setValue,
  };
};

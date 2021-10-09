/* eslint-disable no-return-assign */
import React from 'react';
import { isString, pick } from 'lodash';
import { useValue } from 'useful-state';
import {
  useInputDebounce,
  useResults,
} from 'q3-ui-helpers/lib/hooks';
import { array } from 'q3-ui-helpers';
import { asOptions } from '../helpers';
import { BuilderState } from '../FormsContext';
import { expandOptions } from '../fields/optionsThreshold';

export const formatFieldOptions = (items = []) =>
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
  freeSolo = false,
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
  const shouldRun = useInputDebounce(value);

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

  const filterByFreeSolo = (xs) => {
    const toLower = (str) => String(str).toLowerCase();
    const compare = (str) =>
      toLower(str).includes(toLower(value));

    if (freeSolo && !loadOptions)
      return xs.filter((item) => {
        if (isString(item)) {
          return compare(item);
        }

        return compare(item?.label);
      });

    return xs;
  };

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
    items: filterByFreeSolo(
      loadOptionsPlainly
        ? items
        : formatFieldOptions(items),
    ),
    loading,
    value,
    onChange,
    setValue,
  };
};

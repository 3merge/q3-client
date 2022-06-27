import React from 'react';
import {
  get,
  map,
  first,
  find,
  isObject,
  uniq,
  compact,
  flatten,
} from 'lodash';
import useCollectionUiLocalStorage from '../../hooks/useCollectionUiLocalStorage';

const getUiName = (item) =>
  isObject(item.ui) ? item.ui.label : item.ui;

const getUiComponent = (item) =>
  get(item, 'component', item);

const withCollectionUi = (Component, args = {}) => {
  const { ui, uis = [] } = args;
  const uiOptions = uniq(
    compact(flatten([map(uis, getUiName), ui])),
  );

  const ComponentDecoratedWithCachedUiPreference = (
    props,
  ) => {
    const { cached } = useCollectionUiLocalStorage(
      first(uiOptions),
      uiOptions,
    );

    return React.useMemo(() => {
      const uiProps = find(
        uis,
        (uix) => getUiName(uix) === cached,
      );

      return (
        <Component
          {...args}
          {...uiProps}
          {...props}
          ui={
            isObject(uiProps?.ui)
              ? getUiComponent(uiProps.ui)
              : getUiComponent(cached)
          }
          uis={map(uis, (item) => {
            const label = getUiName(item);

            return {
              label,
              icon: item?.ui?.icon,
              selected: label === cached,
            };
          })}
        />
      );
    }, [cached]);
  };

  return ComponentDecoratedWithCachedUiPreference;
};

export default withCollectionUi;

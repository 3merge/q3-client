import React from 'react';
import { get, map, size, find, isObject } from 'lodash';
import useCollectionUiLocalStorage from '../../hooks/useCollectionUiLocalStorage';

const getUiName = (item) =>
  isObject(item.ui) ? item.ui.label : item.ui;

const getUiComponent = (item) =>
  get(item, 'component', item);

const withCollectionUi =
  (Component, args = {}) =>
  (props) => {
    const { ui, uis = [] } = args;
    const { cached: settledUi } =
      useCollectionUiLocalStorage(
        size(uis) ? uis[0]?.ui : ui,
        [map(uis, getUiName), ui],
      );

    const uiProps = find(
      uis,
      (uix) => getUiName(uix) === settledUi,
    );

    const uiComponent = isObject(uiProps?.ui)
      ? getUiComponent(uiProps.ui)
      : getUiComponent(settledUi);

    return React.useMemo(
      () => (
        <Component
          {...args}
          {...uiProps}
          {...props}
          ui={uiComponent}
          uis={map(uis, (item) => {
            const label = getUiName(item);

            return {
              label,
              icon: item?.ui?.icon,
              selected: label === settledUi,
            };
          })}
        />
      ),
      [settledUi],
    );
  };

export default withCollectionUi;

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
    const { cached, change } = useCollectionUiLocalStorage(
      size(uis) ? uis[0]?.ui : ui,
      [map(uis, getUiName), ui],
    );

    const [settledUi, setSettledUi] =
      React.useState(cached);

    React.useEffect(() => {
      change(settledUi);
    }, [settledUi]);

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
              onClick: () => setSettledUi(label),
              selected: label === settledUi,
              icon: item?.ui?.icon,
            };
          })}
        />
      ),
      [settledUi],
    );
  };

export default withCollectionUi;

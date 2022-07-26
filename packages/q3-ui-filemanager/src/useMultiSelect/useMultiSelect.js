import React from 'react';
import Selecto from 'selecto';
import {
  debounce,
  get,
  filter,
  forEach,
  size,
  split,
  uniq,
} from 'lodash';
import { array } from 'q3-ui-helpers';

const useMultiSelect = () => {
  const container = React.useRef();
  const selectoInstance = React.useRef();
  const [disabled, setDisabled] = React.useState(false);
  const [selected, setSelected] = React.useState([]);

  const formatId =
    (fn) =>
    (id, ...rest) =>
      fn(split(id, ','), ...rest);

  const isSelected = React.useCallback(
    (str) => {
      const id = split(str, ',');
      return Array.isArray(id)
        ? id.every(selected.includes.bind(selected))
        : selected.includes(id);
    },
    [selected],
  );

  const select = formatId((id, continueSelection = false) =>
    setSelected((prevValue) =>
      continueSelection
        ? uniq(prevValue.concat(id))
        : array.is(id),
    ),
  );

  const deselect = formatId((id) =>
    setSelected((prevValue) =>
      filter(prevValue, (item) =>
        Array.isArray(id)
          ? !id.includes(item)
          : item !== id,
      ),
    ),
  );

  const clearSelected = () => {
    setSelected([]);
  };

  const preventWhenDisabled =
    (fn) =>
    (...params) =>
      disabled ? null : fn(...params);

  const enable = () => setDisabled(false);
  const disable = () => setDisabled(true);

  React.useEffect(() => {
    selectoInstance.current = new Selecto({
      container: container.current,
      dragContainer: container.current,
      hitRate: 0.01,
      selectableTargets: ['.q3-file', '.q3-folder'],
      selectByClick: false,
      selectFromInside: false,
    });

    selectoInstance.current.on(
      'select',
      preventWhenDisabled((e) => {
        if (!size(e.selected)) return;

        const forEachNode = (key, action) =>
          forEach(get(e, key), (node) => {
            const id = node.getAttribute('data-id');
            if (id) action(id, true);
          });

        forEachNode('added', select);
        forEachNode('removed', deselect);
      }),
    );

    selectoInstance.current.on(
      'dragEnd',
      preventWhenDisabled(() => {
        disable();
        // just enough time to not trigger other click actions
        const fn = debounce(enable, 25);
        fn();
      }),
    );
  }, []);

  return {
    clearSelected,
    container,
    deselect,
    disable,
    disabled,
    enable,
    isSelected,
    select,
    selected,
    sizeOfSelected: size(selected),
  };
};

export default useMultiSelect;

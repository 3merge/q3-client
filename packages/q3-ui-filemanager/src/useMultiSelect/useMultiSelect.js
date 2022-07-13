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

const useMultiSelect = () => {
  const container = React.useRef();
  const selectoInstance = React.useRef();
  const [disabled, setDisabled] = React.useState(false);
  const [selected, setSelected] = React.useState([]);

  const isSelected = React.useCallback(
    (str) => {
      const id = split(str, ',');
      return Array.isArray(id)
        ? id.every(selected.includes.bind(selected))
        : selected.includes(id);
    },
    [selected],
  );

  const select = React.useCallback(
    (id) =>
      setSelected((prevValue) =>
        uniq(prevValue.concat(id)),
      ),
    [selected],
  );

  const deselect = React.useCallback(
    (id) =>
      setSelected((prevValue) =>
        filter(prevValue, (item) =>
          Array.isArray(id)
            ? !id.includes(item)
            : item !== id,
        ),
      ),
    [],
  );

  const clearSelected = () => setSelected([]);
  const enable = () => setDisabled(false);
  const disable = () => setDisabled(true);

  React.useEffect(() => {
    selectoInstance.current = new Selecto({
      container: container.current,
      continueSelect: false,
      hitRate: 0.01,
      selectableTargets: ['.q3-file', '.q3-folder'],
      selectByClick: false,
      selectFromInside: false,
    });

    selectoInstance.current.on('select', (e) => {
      const forEachNode = (key, action) =>
        forEach(get(e, key), (node) => {
          const id = split(
            node.getAttribute('data-id'),
            ',',
          );

          if (id) action(id);
        });

      forEachNode('added', select);
      forEachNode('removed', deselect);
    });

    selectoInstance.current.on('dragEnd', () => {
      enable();
      // just enough time to not trigger other click actions
      const fn = debounce(disable, 10);
      fn();
    });
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

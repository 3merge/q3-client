import React from 'react';
import Selecto from 'selecto';
import { debounce, size, uniq } from 'lodash';
import FileManagerBatchContext from '../FileManagerBatchContext';
import useStyle from './styles';

const DragToSelect = ({ children }) => {
  const [checked, setChecked] = React.useState([]);
  const [disable, setDisable] = React.useState(false);

  const container = React.useRef();
  const selectoInstance = React.useRef();
  const cls = useStyle();

  const batchState = React.useMemo(
    () => ({
      disable,
      checked,
      numberOfItemsChecked: size(checked),

      isChecked(value) {
        return checked.includes(value);
      },

      setChecked(newValue) {
        setChecked((prevValue) =>
          uniq(prevValue.concat(newValue)),
        );
      },

      removeChecked(oldValue) {
        setChecked((prevValue) =>
          prevValue.filter((item) =>
            Array.isArray(oldValue)
              ? !oldValue.includes(item)
              : item !== oldValue,
          ),
        );
      },
    }),
    [disable, checked],
  );

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
      e.added.forEach((el) => {
        batchState.setChecked(
          el.getAttribute('data-id').split(','),
        );
      });

      e.removed.forEach((el) => {
        batchState.removeChecked(
          el.getAttribute('data-id').split(','),
        );
      });
    });

    selectoInstance.current.on('dragEnd', () => {
      setDisable(true);
      const di = debounce(setDisable, 10);
      di(false);
    });
  }, []);

  return (
    <FileManagerBatchContext.Provider value={batchState}>
      <div className={cls.root} ref={container}>
        {children}
      </div>
    </FileManagerBatchContext.Provider>
  );
};

export default DragToSelect;

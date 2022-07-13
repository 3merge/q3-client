import React from 'react';
import { join, isObject, size } from 'lodash';
import { object } from 'q3-ui-helpers';
import FileManagerContext from '../FileManagerContext';
import FileManagerBatchContext from '../FileManagerBatchContext';

const useDropEnd = () => {
  const ctx = React.useContext(FileManagerContext);
  const [dropState, setDropState] = React.useState(null);
  const { selected } = React.useContext(
    FileManagerBatchContext,
  );

  const onDropEnd = (item, monitor) => {
    if (monitor.didDrop())
      setDropState({
        ...monitor.getDropResult(),
        ...item,
      });
  };

  const withQueryParamIds = (str) =>
    String(str).includes(',') ? `?ids=${str}` : str;

  React.useEffect(() => {
    if (isObject(dropState)) {
      const { id, path } = dropState;

      object
        .noop(
          ctx.patch(
            withQueryParamIds(
              size(selected) ? join(selected, ',') : id,
            ),
          )({
            folder: path,
          }),
        )
        .finally(() => {
          setDropState(null);
        });
    }
  }, [dropState]);

  return onDropEnd;
};

export default useDropEnd;

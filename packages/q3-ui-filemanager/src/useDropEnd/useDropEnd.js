import React from 'react';
import { isObject } from 'lodash';
import useDirectoryFoldersChange from '../useDirectoryFoldersChange';

const useDropEnd = () => {
  const [dropState, setDropState] = React.useState(null);
  const onChange = useDirectoryFoldersChange();

  const onDropEnd = (item, monitor) => {
    if (monitor.didDrop())
      setDropState({
        ...item,
        ...monitor.getDropResult(),
      });
  };

  React.useEffect(() => {
    if (isObject(dropState)) {
      const { id, path, itemType } = dropState;

      onChange({
        // keep folder structures intact
        replace: itemType !== 'folder',
        folder: path,
        id,
      }).finally(() => {
        setDropState(null);
      });
    }
  }, [dropState]);

  return onDropEnd;
};

export default useDropEnd;

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
      const { id, folderId = null } = dropState;

      onChange({
        id,
        folderId,
      }).finally(() => {
        setDropState(null);
      });
    }
  }, [dropState]);

  return onDropEnd;
};

export default useDropEnd;

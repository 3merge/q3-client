import React from 'react';
import { useAuth } from 'q3-ui-permissions';
import {
  Dispatcher,
  Definitions,
} from '../containers/state';
import { useTrashFail } from '../containers/trash/Trash';

const useBulkDeleteFunction = () => {
  const { collectionName } = React.useContext(Definitions);
  const { removeBulk } = React.useContext(Dispatcher);
  const { canDeleteSub } = useAuth(collectionName);
  const catchHandler = useTrashFail();

  return canDeleteSub('id')
    ? (checked, callback = () => null) =>
        removeBulk(checked)()
          .then(callback)
          .catch(catchHandler)
    : null;
};

export default useBulkDeleteFunction;

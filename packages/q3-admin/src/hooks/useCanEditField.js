import React from 'react';
import { useAuth } from 'q3-ui-permissions';
import { Definitions } from '../containers/state';

const useCanEditField = (field) => {
  const { collectionName } = React.useContext(Definitions);
  const { canEditSub } = useAuth(collectionName);

  // without a collection,
  // we have to assume everything is edittable
  return collectionName && field ? canEditSub(field) : true;
};

export default useCanEditField;

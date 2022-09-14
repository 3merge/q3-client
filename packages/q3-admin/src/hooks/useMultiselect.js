import React from 'react';
import { useAuth } from 'q3-ui-permissions';
import { get, size } from 'lodash';
import { Definitions } from '../containers/state';

const useMultiselect = () => {
  const { collectionName, io } =
    React.useContext(Definitions);
  const { canDeleteSub } = useAuth(collectionName);
  const gt = (a) => size(a) > 0;

  return (
    canDeleteSub('id') ||
    gt(get(io, 'exports')) ||
    gt(get(io, 'imports'))
  );
};

export default useMultiselect;

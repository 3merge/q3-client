import React from 'react';
import { useAuth } from 'q3-ui-permissions';
import { get, size } from 'lodash';
import { Definitions } from '../containers/state';

const useMultiselect = (props) => {
  const { collectionName } = React.useContext(Definitions);
  const { canDeleteSub } = useAuth(collectionName);

  const gt = (a) => size(a) > 0;

  return (
    canDeleteSub('id') ||
    gt(get(props, 'io.exports')) ||
    gt(get(props, 'io.imports'))
  );
};

export default useMultiselect;

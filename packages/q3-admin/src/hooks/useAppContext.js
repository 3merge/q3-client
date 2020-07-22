import React from 'react';
import { get } from 'lodash';
import { AuthContext } from 'q3-ui-permissions';
import { Context } from '../AppContext';
import { Definitions } from '../containers/state';

export default (componentProps = {}) => {
  const { collectionName } = React.useContext(Definitions);
  const c = React.useContext(Context);

  const role = get(
    React.useContext(AuthContext),
    'state.profile.role',
  );

  return React.useCallback(
    (feature) => {
      const input = componentProps[feature];
      if (!input || c.enable) return input;

      return get(
        c,
        `${collectionName}.${role}`,
        [],
      ).includes(feature)
        ? input
        : null;
    },
    [componentProps, collectionName, role],
  );
};

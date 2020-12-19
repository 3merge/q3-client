import React from 'react';
import { useLocation } from '@reach/router';
import { Definitions } from '../containers/state';
import { SocketContext } from '../containers/Socket';

export default (onChange) => {
  const { join, leave, watch } = React.useContext(
    SocketContext,
  );

  const { collectionName, id } = React.useContext(
    Definitions,
  );

  const location = useLocation();
  const args = { collectionName };

  React.useEffect(() => {
    if (id) return undefined;

    join(args);
    watch(() =>
      onChange(location?.search)
        .then(() => {
          // noop
        })
        .catch(() => {
          // some sort of notice?
          // manually refresh?
        }),
    );

    return () => {
      leave(args);
    };
  }, [collectionName, id]);

  return null;
};

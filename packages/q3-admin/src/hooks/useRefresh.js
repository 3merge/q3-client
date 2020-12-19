import React from 'react';
import { throttle } from 'lodash';
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

  let fn = onChange;

  React.useEffect(() => {
    if (id) return undefined;

    const handleWatch = throttle(() => {
      if (fn)
        fn(location?.search)
          .then(() => {
            // noop
          })
          .catch(() => {
            // noop
          });
    }, 1500);

    join(args);
    watch(handleWatch);

    return () => {
      leave(args);
      handleWatch.cancel();
      fn = null;
    };
  }, [collectionName, id]);

  return null;
};

import React from 'react';
import { AuthContext } from 'q3-ui-permissions';
import axios from 'axios';
import { get } from 'lodash';
import { object } from 'q3-ui-helpers';

const useSegmentsFetch = () => {
  const [data, setData] = React.useState({});
  const [init, setInit] = React.useState(false);

  const enabled = get(
    React.useContext(AuthContext),
    'state.profile.developer',
    false,
  );

  // no matter what happens, let's move on
  const handleRequest = (pendingPromise) =>
    object.noop(pendingPromise).then(() => {
      setInit(true);
    });

  React.useState(() => {
    if (!enabled && !init) setInit(true);
    else if (!init)
      handleRequest(
        axios
          .get('/sys/segments')
          .then((response) =>
            setData(get(response, 'data.segments', {})),
          ),
      );
  }, [enabled]);

  return {
    data,
    enabled,
    init,
  };
};

export default useSegmentsFetch;

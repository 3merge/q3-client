import React from 'react';
import axios from 'axios';
import { object } from 'q3-ui-helpers';
import { get } from 'lodash';
import { useChangeEventListener } from 'q3-ui-sse';

const useCounters = () => {
  const [state, setState] = React.useState({});
  const collectionName = 'system-counters';

  const init = () =>
    object.noop(
      axios.get(`/${collectionName}`).then((response) => {
        setState(get(response, 'data.counters', {}));
      }),
    );

  // small delay
  useChangeEventListener(collectionName, init, 2000);

  React.useEffect(() => {
    init();
  }, []);

  return state;
};

export default useCounters;

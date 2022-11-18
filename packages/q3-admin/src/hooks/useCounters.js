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
  useChangeEventListener(collectionName, init, 2500);

  React.useEffect(() => {
    init();
  }, []);

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (state.notifications) {
        setState((prev) => ({
          ...prev,
          notifications: prev.notifications + 1,
        }));
      }
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, [state]);

  return state;
};

export default useCounters;

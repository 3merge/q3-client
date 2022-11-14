import React from 'react';
import { object } from 'q3-ui-helpers';
import useRest from 'q3-ui-rest';

const useNotificationsPolling = (location = {}) => {
  const r = useRest({
    key: 'notification',
    pluralized: 'notifications',
    runOnInit: true,
    url: '/notifications',
    location,
  });

  React.useEffect(() => {
    const timer = setInterval(
      () => object.noop(r.poll(location.search)),
      15000,
    );

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, []);

  return r;
};

export default useNotificationsPolling;

import React from 'react';
import { object } from 'q3-ui-helpers';
import useRest from 'q3-ui-rest';

const useNotificationsPolling = (location = {}) => {
  const { search = '?' } = location;
  const r = useRest({
    key: 'notification',
    pluralized: 'notifications',
    runOnInit: true,
    url: '/notifications',
    location,
  });

  React.useEffect(() => {
    const timer = setInterval(
      () => object.noop(r.poll(search)),
      15000,
    );

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [search]);

  return r;
};

export default useNotificationsPolling;

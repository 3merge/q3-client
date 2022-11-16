import React from 'react';
import { object } from 'q3-ui-helpers';
import useRest from 'q3-ui-rest';
import { useChangeEventListener } from 'q3-ui-sse';
import moment from 'moment';
import { get } from 'lodash';
import axios from 'axios';

const useNotificationsPolling = (location = {}) => {
  const ref = React.useRef();
  const r = useRest({
    key: 'notification',
    pluralized: 'notifications',
    runOnInit: true,
    url: '/notifications',
    location,
  });

  const logTimestamp = () => {
    ref.current = encodeURIComponent(
      moment().toISOString(),
    );
  };

  useChangeEventListener('notifications', () => {
    // ensures we're refreshing the right view
    const s = String(location?.search)
      .replace('sort=-createdAt', 'sort=-updatedAt')
      .concat(`&updatedAt>=${ref.current}`);

    return object.noop(
      axios.get(`/notifications${s}`).then((resp) => {
        // will take over
        r.replace(get(resp, 'data', {}));
        logTimestamp();
      }),
    );
  });

  React.useEffect(() => {
    logTimestamp();
  }, []);

  return r;
};

export default useNotificationsPolling;

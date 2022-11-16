import { object } from 'q3-ui-helpers';
import useRest from 'q3-ui-rest';
import { useChangeEventListener } from 'q3-ui-sse';

const useNotificationsPolling = (location = {}) => {
  const { search = '?' } = location;
  const r = useRest({
    key: 'notification',
    pluralized: 'notifications',
    runOnInit: true,
    url: '/notifications',
    location,
  });

  useChangeEventListener('notifications', () =>
    object.noop(r.poll(search)),
  );

  return r;
};

export default useNotificationsPolling;

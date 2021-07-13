import React from 'react';
import { debounce, invoke, map, filter } from 'lodash';
import axios from 'axios';
import { browser } from 'q3-ui-helpers';
import {
  CHANGE,
  CONNECT,
  ERROR,
  makeEventName,
} from './useServerSideEvents';

export const addDocumentListener = (eventName, fn) => {
  if (!browser.isBrowserReady()) return;

  invoke(document, 'addEventListener', eventName, fn, {
    passive: true,
  });
};

export const removeDocumentListener = (eventName, fn) => {
  if (!browser.isBrowserReady()) return;
  invoke(document, 'removeEventListener', eventName, fn);
};

export default () => {
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState(false);
  const ref = React.useRef();

  const markNotificationAsSeen = (id) => {
    const equals = (xs) =>
      Array.isArray(id) ? id.includes(xs.id) : xs.id === id;

    setData((prev) =>
      prev.map((item) => ({
        ...item,
        ...(equals(item)
          ? {
              'hasDownloaded': true,
              'hasSeen': true,
            }
          : {}),
      })),
    );
  };

  const syncSeen = () =>
    axios
      .post('/system-notifications', {
        ids: map(
          filter(data, {
            hasSeen: true,
            hasDownloaded: true,
          }),
          'id',
        ),
      })
      .then(() => {
        // noop
      })
      .catch(() => {
        // noop
      });

  const acknowledge = (eventInstance, id) => {
    markNotificationAsSeen(id);
    ref.current = true;
  };

  const fetchNotifications = () =>
    axios
      .get('/system-notifications')
      .then((d) => {
        setData(d?.data?.notifications || []);
      })
      .catch(() => {
        setError(true);
      });

  const onChange = debounce(fetchNotifications, 5000);

  React.useEffect(() => {
    const general = makeEventName();
    const noti = makeEventName('q3-api-notifications');

    const handleGeneral = (event) => {
      const { action } = event.data;
      if (action === CONNECT) setError(false);
      if (action === ERROR) setError(true);
    };

    const handleNoti = (event) => {
      const { action } = event.data;
      if (action === CHANGE) {
        setError(false);
        onChange();
      }
    };

    addDocumentListener(noti, handleNoti);
    addDocumentListener(general, handleGeneral);
    fetchNotifications();

    return () => {
      removeDocumentListener(general, handleGeneral);
      removeDocumentListener(noti, handleNoti);
    };
  }, []);

  React.useEffect(() => {
    if (ref.current && data)
      syncSeen().then(() => {
        ref.current = false;
      });
  }, [data]);

  return {
    // @note to be deprecated
    acknowledge,
    syncSeen,
    data: data.map((item) => ({
      // @note will replace top-level acknowledge method
      acknowledge: () => markNotificationAsSeen(item.id),
      label: item.path,
      ...item,
    })),
    error,
  };
};

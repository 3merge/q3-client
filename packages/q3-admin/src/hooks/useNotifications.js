import React from 'react';
import { debounce, invoke } from 'lodash';
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

  const acknowledge = (eventInstance, id) => {
    setData((prev) =>
      prev.map((item) => ({
        ...item,
        ...(item.id === id
          ? {
              'hasDownloaded': true,
              'hasSeen': true,
            }
          : {}),
      })),
    );

    return axios
      .post(`/system-notifications/${id}`)
      .then(() => {
        // noop
      })
      .catch(() => {
        // noop
      });
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

  return {
    acknowledge,
    data: data.map((item) => ({
      label: item.path,
      ...item,
    })),
    error,
  };
};

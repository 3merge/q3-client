import React from 'react';
import { map, filter, get } from 'lodash';
import axios from 'axios';
import { object } from 'q3-ui-helpers';
import useNotificationsEvent from './useNotificationsEvent';

export default (options = {}) => {
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const getSeen = () =>
    map(
      filter(data, (xs) => xs.hasSeen && xs.hasDownloaded),
      'id',
    );

  const markAsSeen = (id) => {
    if (!id) return null;

    const equals = (xs) =>
      Array.isArray(id) ? id.includes(xs.id) : xs.id === id;

    return setData((prev) =>
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

  const services = {
    get: () =>
      axios
        .get('/system-notifications', {
          params: {
            numberOfDays: get(options, 'numberOfDays', 1),
          },
        })
        .then((d) =>
          setData(get(d, 'data.notifications', [])),
        )
        .catch(() => {
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        }),

    post: () => {
      console.log('POST', getSeen());
      return object.noop(
        axios.post('/system-notifications', {
          ids: getSeen(),
        }),
      );
    },

    clear: () => {
      setData((prev) =>
        prev.map((item) => ({
          ...item,
          hasDownloaded: true,
          hasSeen: true,
        })),
      );

      // gives it a second to catchup
      setTimeout(() => object.noop(services.post()));
    },
  };

  useNotificationsEvent(services.get, {
    onConnect: () => setError(false),
    onError: () => setError(true),
  });

  return {
    data,
    error,
    loading,
    getSeen,
    markAsSeen,
    ...services,
  };
};

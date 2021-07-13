import React from 'react';
import { map, filter, get } from 'lodash';
import axios from 'axios';
import { object } from 'q3-ui-helpers';
import useNotificationsEvent from './useNotificationsEvent';

export default (options = {}) => {
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState(false);

  const getSeen = () =>
    map(
      filter(
        data,
        (xs) =>
          xs.hasSeen && xs.hasDownloaded && !xs.dismissedOn,
      ),
      'id',
    );

  const markAsSeen = (id) => {
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
        }),

    post: () =>
      object.noop(
        axios.post('/system-notifications', {
          ids: getSeen(),
        }),
      ),
  };

  useNotificationsEvent(services.get, {
    onConnect: () => setError(false),
    onError: () => setError(true),
  });

  return {
    data,
    error,
    getSeen,
    markAsSeen,
    ...services,
  };
};

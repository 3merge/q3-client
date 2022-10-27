import React from 'react';
import { size } from 'lodash';
import useNotificationsService from './useNotificationsService';

export default (options) => {
  const {
    clear,
    data,
    error,
    loading,
    getSeen,
    markAsSeen,
    post,
  } = useNotificationsService(options);

  const ref = React.useRef();

  const acknowledge = (eventInstance, id) => {
    // eslint-disable-next-line
    console.warn(
      'Soon to be deprecated. Please use "acknowledge" at the item level instead.',
    );

    markAsSeen(id);
    ref.current = true;
  };

  React.useEffect(() => {
    /**
     * @note
     * Here to support the legacy acknowledge method.
     */
    if (ref.current && size(data))
      post().then(() => {
        ref.current = false;
      });
  }, [data]);

  return {
    acknowledge,
    syncSeen: post,
    getSeen,
    data: data.map((item) => ({
      acknowledge: () => markAsSeen(item.id),
      label: item.path,
      ...item,
    })),
    error,
    loading,
    clear,
  };
};

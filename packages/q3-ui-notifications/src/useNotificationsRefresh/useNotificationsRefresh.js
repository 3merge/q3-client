import React from 'react';
import { get, map, find } from 'lodash';
import axios from 'axios';
import moment from 'moment';
import { object } from 'q3-ui-helpers';

const useNotificationsRefresh = (incomingData = []) => {
  const [refreshed, setRefreshed] = React.useState([]);
  const ref = React.useRef();

  const data = React.useMemo(
    () =>
      map(
        incomingData,
        (item) =>
          find(
            refreshed,
            (refreshedItem) =>
              String(refreshedItem.id) === String(item.id),
          ) || item,
      ),
    [incomingData, refreshed],
  );

  const logTimestamp = () => {
    ref.current = encodeURIComponent(
      moment().toISOString(),
    );
  };

  const refresh = () =>
    object.noop(
      axios
        .get(
          `/notifications?sort=-updatedAt&limit=500&updatedAt>=${ref.current}`,
        )
        .then((resp) => {
          setRefreshed((prev = []) =>
            prev.concat(
              get(resp, 'data.notifications', []),
            ),
          );

          console.log('here,,,');
          logTimestamp();
        }),
    );

  React.useEffect(() => {
    logTimestamp();
  }, []);

  return {
    data,
    refresh,
  };
};

export default useNotificationsRefresh;

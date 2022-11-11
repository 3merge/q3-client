import React from 'react';
import useRest, { useInfiniteScroll } from 'q3-ui-rest';
import { useQueryParams } from 'q3-ui-queryparams';
import { compact, get } from 'lodash';
import moment from 'moment';
import axios from 'axios';
import { object } from 'q3-ui-helpers';

const useNotifications = (spec) => {
  const [refreshed, setRefreshed] = React.useState([]);
  const { encode } = useQueryParams();

  const lastWeek = React.useMemo(
    () =>
      moment()
        .subtract('1', 'week')
        .startOf('day')
        .toISOString(),
    [],
  );

  const getSearchParams = React.useCallback(
    (xs) =>
      encode({
        ...xs,
        ...get(
          {
            all: {
              archived: 'exists(false)',
            },
            archived: {
              archived: 'exists(true)',
            },
            latest: {
              'createdAt>': lastWeek,
            },
            unread: {
              archived: 'exists(false)',
              read: 'exists(false)',
            },
          },
          spec,
          {},
        ),
      }),
    [lastWeek, spec],
  );

  const search = getSearchParams();

  const location = {
    search: search.concat('&sort=-createdAt&limit=50'),
  };

  const {
    fetching,
    fetchingError,
    hasNextPage,
    notifications,
    patch,
    poll,
  } = useRest({
    key: 'notification',
    location,
    pluralized: 'notifications',
    runOnInit: true,
    url: '/notifications',
  });

  React.useEffect(() => {
    setInterval(() => {
      object.noop(
        axios
          .get(
            '/notifications'
              .concat(search)
              .concat('&sort=-updatedAt&limit=10'),
          )
          .then((resp) => {
            setRefreshed((prev = []) =>
              prev.concat(
                get(resp, 'data.notifications', []),
              ),
            );
          }),
      );
    }, 15000);
  }, []);

  const data = React.useMemo(
    () => compact([refreshed, notifications].flat()),
    [notifications, refreshed],
  );

  return {
    fetching,
    fetchingError,

    ...useInfiniteScroll({
      data,
      hasNextPage,
      location,
      poll,
    }),

    updateToArchived(id) {
      const action = patch(id);
      return action({
        archived: true,
      });
    },

    updateToRead(id) {
      const action = patch(id);
      return action({
        read: true,
      });
    },
  };
};

export default useNotifications;

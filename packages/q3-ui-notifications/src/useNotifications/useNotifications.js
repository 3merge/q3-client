import React from 'react';
import useRest, { useInfiniteScroll } from 'q3-ui-rest';
import { useQueryParams } from 'q3-ui-queryparams';
import { get } from 'lodash';
import moment from 'moment';

const useNotifications = (spec) => {
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
              read: 'exists(true)',
            },
          },
          spec,
          {},
        ),
      }).concat('&sort=-createdAt&limit=50'),
    [lastWeek, spec],
  );

  const search = getSearchParams();
  const location = { search };

  const r = useRest({
    key: 'notification',
    location,
    pluralized: 'notifications',
    runOnInit: true,
    url: '/notifications',
  });

  return {
    fetching: r.fetching,
    fetchingError: r.fetchingError,
    ...useInfiniteScroll({
      data: r.notifications,
      hasNextPage: r.hasNextPage,
      location,
      poll: r.poll,
    }),
  };
};

export default useNotifications;

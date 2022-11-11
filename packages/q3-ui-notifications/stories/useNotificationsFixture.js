import React from 'react';
import moment from 'moment';
import { useQueryParams } from 'q3-ui-queryparams';
import { chunk, nth, orderBy, map } from 'lodash';
import data from './fixture';

const useNotificationsFixture = (mockAxiosInstance) => {
  const [state, setState] = React.useState(data);

  mockAxiosInstance.onGet(/notifications/).reply((args) => {
    const { decode } = useQueryParams();
    const {
      limit,
      sort,
      page = 0,
      ...filters
    } = decode(args.url.split('?')[1]);

    const toQueryParamFunc = (bool) =>
      bool ? 'exists(true)' : 'exists(false)';

    const notifications = chunk(
      orderBy(
        map(state, (item) => ({
          ...item,
          archived: toQueryParamFunc(item.archived),
          read: toQueryParamFunc(item.read),
        })),
        [String(sort).replace(/-/g, '')],
        [String(sort).startsWith('-') ? 'desc' : 'asc'],
      ),
      limit,
    );

    return [
      200,
      {
        hasNextPage: page < notifications.length,
        notifications: nth(notifications, page),
      },
    ];
  });
};
export default useNotificationsFixture;

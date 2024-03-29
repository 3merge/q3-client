import React from 'react';
import moment from 'moment';
import { useQueryParams } from 'q3-ui-queryparams';
import {
  chunk,
  nth,
  orderBy,
  filter,
  last,
  includes,
  size,
} from 'lodash';
import data from './fixture';

// to workaround integer vs. string ids
const makeId = (num) => `#${num}`;

const useNotificationsFixture = (mockAxiosInstance) => {
  const updatedAt = new Date().toISOString();
  const [state, setState] = React.useState(
    data.map((item) => ({
      ...item,
      // no numbers!
      id: makeId(item.id),
      updatedAt,
    })),
  );

  const getIdsFromUrl = (args = {}) => {
    const { url } = args;
    const id = last(url.split('/'));
    const ids = new URLSearchParams(
      `?${last(url.split('?'))}`,
    ).getAll('ids[]');

    return {
      id,
      ids,
    };
  };

  React.useEffect(() => {
    setTimeout(() => {
      setState((prevState) => [
        ...prevState,
        {
          id: makeId(Math.random() * (10000 - 1000) + 1000),
          updatedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          label: 'Test',
          excerpt: 'Auto-generated from the server',
          messageType: 'notice',
          read: false,
          archived: false,
        },
      ]);
    }, 30000);
  }, []);

  mockAxiosInstance.onGet(/notifications/).reply((args) => {
    const { decode } = useQueryParams();
    const {
      limit,
      sort,
      page = 0,
      ...filters
    } = decode(
      args.url.split('?')[1],
      {},
      {
        dateformat: moment.ISO_8601,
      },
    );

    const notifications = chunk(
      orderBy(
        filter(state, (item) =>
          /**
           * Clumbsy replication of server logic
           */
          Object.entries(filters).every(([key, value]) => {
            if (value === 'exists(false)') {
              return item[key] === false;
            }

            if (value === 'exists(true)') {
              return item[key] === true;
            }

            if (key === 'createdAt>') {
              return moment(item.createdAt).isSameOrAfter(
                value,
              );
            }

            if (key === 'updatedAt>') {
              return moment(item.updatedAt).isSameOrAfter(
                value,
              );
            }

            return item[key] === value;
          }),
        ),
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

  mockAxiosInstance
    .onPatch(/notifications/)
    .reply((args) => {
      const { data: op } = args;
      const { id, ids } = getIdsFromUrl(args);

      const notifications = [];
      let notification = {};

      const newUpdatedAt = new Date().toISOString();

      const newState = state.map((item) => {
        if (includes(ids, String(item.id))) {
          notification = {
            ...item,
            ...JSON.parse(op),
            updatedAt: newUpdatedAt,
          };

          notifications.push(notification);
          return notification;
        }

        if (item.id === id) {
          notification = {
            ...item,
            ...JSON.parse(op),
            updatedAt: newUpdatedAt,
          };

          return notification;
        }

        return item;
      });

      setState(newState);

      return !size(ids)
        ? [
            200,
            {
              notification,
            },
          ]
        : [
            200,
            {
              notifications,
            },
          ];
    });

  mockAxiosInstance
    .onDelete(/notifications/)
    .reply((args) => {
      const { id, ids } = getIdsFromUrl(args);

      const newState = state.filter((item) => {
        if (
          includes(ids, String(item.id)) ||
          item.id === id
        ) {
          return false;
        }

        return true;
      });

      setState(newState);
      return [204];
    });
};
export default useNotificationsFixture;

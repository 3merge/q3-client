import React from 'react';
import Rest from 'q3-ui-test-utils/lib/rest';
import { last, sortBy, orderBy } from 'lodash';
import moment from 'moment';
import { useQueryParams } from 'q3-ui-queryparams';
import changes from './data';
import users from './users';

function isPrime(num) {
  // eslint-disable-next-line
  for (let i = 2; i < num; i++)
    if (num % i === 0) return false;
  return num > 1;
}

const getQueryString = (xs) =>
  last(String(xs.url).split('?'));

// eslint-disable-next-line
export default ({ children }) => {
  const qs = useQueryParams();

  const defineMockRoutes = (m) => {
    m.onGet(/audit/).reply(async (data) => {
      const { date, skip, user, operation } = qs.decode(
        getQueryString(data),
      );
      console.log(data);
      return [
        200,
        {
          // we're just going to add some random data here for testing
          changes: orderBy(changes, ['date'], ['desc'])
            .map((item, i) => {
              if (i % 8 === 0)
                return {
                  ...item,
                  added: {
                    price: {
                      foo: 1,
                      bar: 1,
                    },
                  },
                };

              if (isPrime(i))
                return {
                  ...item,
                  deleted: {
                    price: {
                      foo: 1,
                      bar: 1,
                    },
                  },
                };

              return {
                ...item,
                updated: {
                  foo: 2,
                  quuz: 1,
                },
                previous: {
                  foo: 1,
                  bar: 1,
                },
              };
            })
            .filter((item) => {
              const shouldShow =
                (Array.isArray(operation)
                  ? operation.some((xs) => xs in item)
                  : operation in item) &&
                moment(date).isSameOrAfter(item.date);

              if (user)
                return (
                  String(item.user.id) === String(user) &&
                  shouldShow
                );

              return shouldShow;
            })
            .slice(skip * 150, 150 * (skip + 1)),
        },
      ];
    });

    m.onGet(/q3-api-users/).reply(async (data) => {
      const q = qs
        .decode(getQueryString(data))
        .search.toLowerCase();

      const includes = (xs) =>
        String(xs).toLowerCase().includes(q);

      return [
        200,
        {
          users: sortBy(
            users.filter(
              (item) =>
                includes(item.firstName) ||
                includes(item.lastName),
            ),
            'firstName',
          ).slice(0, 8),
        },
      ];
    });
  };

  return (
    <Rest define={defineMockRoutes} delay={1000}>
      {children}
    </Rest>
  );
};

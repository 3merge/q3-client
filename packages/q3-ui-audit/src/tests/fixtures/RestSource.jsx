/* eslint-disable react/prop-types */
import React from 'react';
import Rest from 'q3-ui-test-utils/lib/rest';
import flat from 'flat';
import { last, sortBy, orderBy, lowerCase } from 'lodash';
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

export default ({
  delay = 1000,
  children,
  causeError,
  returnEmpty,
}) => {
  const qs = useQueryParams();

  const defineMockRoutes = (m) => {
    m.onGet(/audit-users/).reply(async () => [
      200,
      {
        users: sortBy(
          users.map((item) => ({
            name: `${item.firstName} ${item.lastName}`,
            id: item.id,
          })),
          'firstName',
        ),
      },
    ]);

    m.onGet(/audit/).reply(async (data) => {
      const { date, skip, user, operation, search } =
        qs.decode(getQueryString(data));

      if (causeError) return [500];
      if (returnEmpty) return [200, { changes: [] }];

      return [
        200,
        {
          // we're just going to add some random data here for testing
          changes: [
            {
              updates: [
                {
                  total: 12,
                },
                {
                  rebatesRedeemed: 2,
                },
              ],
              additions: [
                {
                  item: 'Dumbell',
                  price: 123,
                },
              ],
              user: 'Mike',
              date: new Date(),
            },
            {
              updates: [
                {
                  total: 231,
                },
              ],
              deletions: [
                {
                  item: 'Gloves',
                  price: 19,
                },
              ],
              user: 'Mike',
              date: new Date(),
            },
          ],
        },
      ];
    });
  };

  return (
    <Rest define={defineMockRoutes} delay={delay}>
      {children}
    </Rest>
  );
};

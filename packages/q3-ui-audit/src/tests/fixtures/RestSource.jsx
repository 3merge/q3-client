/* eslint-disable react/prop-types */
import React from 'react';
import Rest from 'q3-ui-test-utils/lib/rest';
import { last, sortBy, uniq } from 'lodash';
import { useQueryParams } from 'q3-ui-queryparams';
import changes from './data';

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
          uniq(
            changes.map((item) => ({
              name: item.user,
              value: item.user,
            })),
          ),
          'name',
        ),
      },
    ]);

    m.onGet(/audit/).reply(async (data) => {
      const { user } = qs.decode(getQueryString(data));
      if (causeError) return [500];
      if (returnEmpty) return [200, { changes: [] }];

      return [
        200,
        {
          changes: user
            ? changes.filter((item) => item.user === user)
            : changes,
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

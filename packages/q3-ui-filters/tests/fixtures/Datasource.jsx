import React from 'react';
import { AuthContext } from 'q3-ui-permissions';
// eslint-disable-next-line
import Rest from 'q3-ui-test-utils/lib/rest';
import { last, lowerCase, uniq } from 'lodash';
import { positions, users } from './data';

export const defineMockRoutes =
  (options = {}) =>
  (m) => {
    const { causeError = false } = options;

    const filterByUrlQueryParams = (
      url,
      data = [],
      key = null,
    ) => {
      const char = lowerCase(
        new URLSearchParams(last(url.split('?'))).get(
          'search',
        ),
      );

      return uniq(data).filter((item) => {
        const target = lowerCase(key ? item[key] : item);
        return target.includes(char);
      });
    };

    const intercept = (fn) => (params) => {
      if (causeError) return [500];
      return fn(params);
    };

    m.onGet(/jobs/).reply(
      intercept(({ url }) => [
        200,
        {
          values: filterByUrlQueryParams(url, positions),
        },
      ]),
    );

    m.onGet(/users/).reply(
      intercept(({ url }) => [
        200,
        {
          users: filterByUrlQueryParams(url, users, 'name'),
        },
      ]),
    );
  };

// eslint-disable-next-line
export default ({ delay = 150, children, ...props }) => (
  <AuthContext.Provider
    value={{
      state: {
        init: true,
        permissions: [
          {
            coll: 'test',
            op: 'Read',
            fields: ['*'],
          },
        ],
      },
    }}
  >
    <Rest define={defineMockRoutes(props)} delay={delay}>
      {children}
    </Rest>
  </AuthContext.Provider>
);

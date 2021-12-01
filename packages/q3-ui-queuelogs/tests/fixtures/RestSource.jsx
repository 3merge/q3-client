/* eslint-disable react/prop-types */
import React from 'react';
import Rest from 'q3-ui-test-utils/lib/rest';

export const defineMockRoutes =
  (options = {}) =>
  (m) => {
    const { causeError = false } = options;
    m.onPost(/queues/).reply(async () => [204, {}]);

    m.onGet(/queues/).reply(() => {
      if (causeError) return [500];
      return [200, { queues: [] }];
    });
  };

export default ({ delay = 1000, children, ...props }) => (
  <Rest define={defineMockRoutes(props)} delay={delay}>
    {children}
  </Rest>
);

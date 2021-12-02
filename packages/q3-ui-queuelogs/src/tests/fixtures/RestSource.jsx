/* eslint-disable react/prop-types,import/no-extraneous-dependencies */
import React from 'react';
import Rest from 'q3-ui-test-utils/lib/rest';
import { last, find, map } from 'lodash';
import queues from './data';

export const defineMockRoutes =
  (options = {}) =>
  (m) => {
    const { causeError = false } = options;
    m.onPatch(/queue-logs/).reply(async ({ url }) => {
      const id = last(url.split('/'));
      const queue = find(
        queues,
        (q) => String(q.id) === id,
      );

      queue.status = 'Scheduled';
      queue.type = 'Once';

      return [
        204,
        {
          queue,
        },
      ];
    });

    m.onDelete(/queue-logs/).reply(async () => [204]);

    m.onGet(/queue-logs/).reply(() => {
      if (causeError) return [500];
      return [
        200,
        {
          queues: map(queues, (q) => ({
            ...q,
            type: q.type || 'Once',
          })),
        },
      ];
    });
  };

export default ({ delay = 1000, children, ...props }) => (
  <Rest define={defineMockRoutes(props)} delay={delay}>
    {children}
  </Rest>
);

import React from 'react';
import useRest from 'q3-ui-rest';
import { string } from 'q3-ui-helpers';
import { includes, map, size } from 'lodash';
import { concat, hasPassed, toSeconds } from '../utils';

const { toDate } = string;

const useQueues = (args = {}) => {
  const [filter, setFilter] = React.useState('');
  const { queues, ...rest } = useRest({
    url: 'queues',
    key: 'queue',
    pluralized: 'queues',
    runOnInit: true,
  });

  const matchesFilter = React.useCallback(
    (str) =>
      !size(filter) ||
      includes(
        String(str).toLowerCase(),
        String(filter).toLowerCase(),
      ),
    [filter],
  );

  const rows = map(queues, (qu) => ({
    ...args,
    ...qu,
    completionDate: toDate(qu.completionDate),
    duration: toSeconds(qu.duration),
    expectedCompletionDate: toDate(
      qu.expectedCompletionDate,
    ),
    name: concat(qu.name, qu.message),
    refresh: rest.poll,
  })).reduce(
    (acc, curr) => {
      if (matchesFilter(curr.name)) {
        if (hasPassed(curr)) acc.past.push(curr);
        else acc.upcoming.push(curr);
      }

      return acc;
    },
    {
      past: [],
      upcoming: [],
    },
  );

  return {
    ...rest,
    ...rows,
    setFilter,
  };
};

export default useQueues;

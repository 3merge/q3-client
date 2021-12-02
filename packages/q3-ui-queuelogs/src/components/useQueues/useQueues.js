import React from 'react';
import useRest from 'q3-ui-rest';
import {
  filter as filterBy,
  includes,
  map,
  size,
  sumBy,
} from 'lodash';
import { concat, hasPassed } from '../utils';

export const getAverageDuration = (xs = []) => {
  const a = filterBy(xs, ({ status }) => status === 'Done');
  return sumBy(a, 'duration') / size(a);
};

const useQueues = (args = {}) => {
  const [filter, setFilter] = React.useState('');
  const { queues, ...rest } = useRest({
    url: '/queue-logs',
    key: 'queue',
    pluralized: 'queues',
    runOnInit: true,
  });

  const average = getAverageDuration(queues);

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
    ...rest,
    name: concat(qu.name, qu.message),
    average,
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

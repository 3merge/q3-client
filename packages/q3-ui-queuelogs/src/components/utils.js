import { compact, isNumber } from 'lodash';

export const concat = (a, b) => compact([a, b]).join(' - ');

export const hasPassed = ({ status }) =>
  ['Done', 'Failed'].includes(status);

export const isRecurring = ({ type }) =>
  type !== 'Recurring';

export const toSeconds = (xs) =>
  isNumber(xs) ? [xs, 's'].join('') : undefined;

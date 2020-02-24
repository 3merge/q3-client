import { pick } from 'lodash';
import { array } from 'q3-ui-helpers';

export const STATUS_READY = 'Ready';
export const STATUS_INITIALIZING = 'Initializing';

export const selectivelyKeepInitialValues = (
  values = {},
  pickDefinitions = [],
) =>
  array.hasLength(pickDefinitions)
    ? pick(values, pickDefinitions)
    : values;

export const getInitialStatus = (len, value) => {
  if (len) return value || STATUS_READY;
  return STATUS_INITIALIZING;
};

export const orTruthy = (v, next) => (v ? next : true);

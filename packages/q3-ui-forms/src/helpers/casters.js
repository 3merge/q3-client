import moment from 'moment';
import { string } from 'q3-ui-helpers';

const isUndefined = (v) =>
  v === null || v === undefined || v === '';

export const castToUTC = (v) =>
  !isUndefined(v)
    ? moment.utc(moment(v).toISOString()).toISOString()
    : v;

export const convertToNullish = (v) =>
  string.hasLength(v) ? v : null;

export const castToBoolean = (v) =>
  v !== 'false' ? `${Boolean(v)}` : v;

import moment from 'moment';
import { array, string } from 'q3-ui-helpers';

const isUndefined = (v) =>
  v === null || v === undefined || v === '';

export const asOptions = (a) =>
  array.is(a).map((value) => ({
    label: value,
    value,
  }));

export const castToUTC = (v) =>
  !isUndefined(v)
    ? moment.utc(moment(v).toISOString()).toISOString()
    : v;

export const convertToNullish = (v) =>
  string.hasLength(v) ? v : null;

export const castToBoolean = (v) =>
  v !== 'false' ? `${Boolean(v)}` : v;

export const makeRangeNames = (name) => [
  `${name}>`,
  `${name}<`,
];

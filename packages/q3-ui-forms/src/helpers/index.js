import moment from 'moment';
import { get } from 'lodash';
import { array, string } from 'q3-ui-helpers';

export { default as handleFormData } from './formData';

const isUndefined = (v) =>
  v === null || v === undefined || v === '';

const pullValue = (v) => String(get(v, 'value', v));

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

export const convertFromRegexPattern = (v) => {
  try {
    const exec = (item) =>
      pullValue(item).replace('/gi', '').replace('/', '');

    return array.hasLength(v) ? v.map(exec) : exec(v);
  } catch (e) {
    return v;
  }
};

export const castToRegex = (v) => {
  try {
    const exec = (item) =>
      String(new RegExp(pullValue(item), 'gi'));

    return array.hasLength(v) ? v.map(exec) : exec(v);
  } catch (e) {
    return v;
  }
};

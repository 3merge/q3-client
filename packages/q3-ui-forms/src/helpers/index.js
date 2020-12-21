import moment from 'moment';
import { uniq, get } from 'lodash';
import { object, array, string } from 'q3-ui-helpers';

export { default as handleFormData } from './formData';

const isUndefined = (v) =>
  v === null || v === undefined || v === '';

const pullValue = (v) => String(get(v, 'value', v));

export const asOptions = (a) =>
  array.is(a).map((value) => ({
    label: value,
    value,
  }));

// alias this method to match newer naming conventions
export const castToOptions = asOptions;

export const castToUTC = (v) =>
  !isUndefined(v)
    ? moment.utc(moment(v).toISOString()).toISOString()
    : v;

export const castToBeginning = (v) =>
  !isUndefined(v)
    ? moment(v)
        .set('hour', 0)
        .set('minute', 0)
        .set('second', 0)
        .format('YY-MM-DD HH:mm:ss')
    : v;

export const castToEnd = (v) =>
  !isUndefined(v)
    ? moment(v)
        .set('hour', 23)
        .set('minute', 59)
        .set('second', 59)
        .format('YY-MM-DD HH:mm:ss')
    : v;

export const convertToNullish = (v) =>
  string.hasLength(v) ? v : null;

export const castToBoolean = (v) =>
  v !== 'false' ? `${Boolean(v)}` : v;

export const castToSimpleArray = (v) =>
  Array.isArray(v)
    ? uniq(
        v.map((item) =>
          typeof item === 'object' ? item.value : item,
        ),
      )
    : [];

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

    return Array.isArray(v) ? v.map(exec) : exec(v);
  } catch (e) {
    return v;
  }
};

export const castFromOptions = (a = []) =>
  array
    .is(a)
    .map((item) => {
      if (typeof item === 'string') return item;
      if (object.isIn(item, 'value')) return item.value;
      return '';
    })
    .filter(Boolean);

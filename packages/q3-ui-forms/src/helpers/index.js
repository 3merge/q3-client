import moment from 'moment';
import { uniq, get } from 'lodash';
import { object, array, string } from 'q3-ui-helpers';
import { timezone } from 'q3-ui-locale';

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

const makeCastToLocaleFn = (format) => (xs) => {
  if (moment(xs, moment.ISO_8601).isValid()) {
    return timezone.toLocal(xs, format) || null;
  }
  return null;
};

export const castToLocalDateTime = makeCastToLocaleFn(
  'YYYY-MM-DDTHH:mm',
);
export const castToLocalDate =
  makeCastToLocaleFn('YYYY-MM-DD');

export const castToUTC = (v) =>
  !isUndefined(v)
    ? moment.utc(moment(v).toISOString()).toISOString()
    : v;

export const addTime = (set) => (v) =>
  !isUndefined(v) ? moment(v).set(set).toISOString() : v;

export const castToBeginning = addTime({
  'hour': 0,
  'minute': 0,
  'second': 0,
});

export const castToEnd = addTime({
  'hour': 23,
  'minute': 59,
  'second': 59,
});

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

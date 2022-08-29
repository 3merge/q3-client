import micromatch from 'micromatch';
import { compact } from 'lodash';
import moment from 'moment';

export const is = (v) => typeof v === 'string';

export const hasLength = (v) => is(v) && v.length > 0;

export const castToLowercase = (s = '') =>
  is(s) ? s.toLowerCase().trim() : s;

export const sanitizeAll = (a = []) =>
  Array.isArray(a)
    ? a.map(castToLowercase).filter(Boolean)
    : a;

export const transformDelineatedStringIntoArray = (
  str = [],
) =>
  Array.isArray(str)
    ? str.map(castToLowercase).filter(Boolean)
    : sanitizeAll(str.split(', '));

export const transformArrayIntoDelineatedString = (
  arr = [],
) => sanitizeAll(arr).join(', ');

export const hasMatch = (target, pattern) =>
  is(target) && is(pattern)
    ? micromatch.isMatch(
        castToLowercase(target),
        castToLowercase(pattern),
      )
    : false;

export const strToBool = (str) =>
  (str === true ||
    str === 'true' ||
    (str && str !== 'false')) &&
  (typeof str !== 'string' || str.toUpperCase() !== 'NO');

export const toTruthy = (str, trans) => {
  const t = (v) => (trans ? trans(v) : v);
  return strToBool(str) ? t('yes') : t('no');
};

const makeDateFn =
  (format) =>
  (str, fallbackText = '') =>
    moment(str, moment.ISO_8601).isValid()
      ? moment.parseZone(str).format(format)
      : fallbackText;

export const toDate = makeDateFn('MMM DD, Y[\r\n]LT');
export const toHoursMinutes = makeDateFn('h:mm a');
export const toSimpleDate = makeDateFn('MMM DD, Y');
export const toYearMonthDay = makeDateFn('YYYY-MM-DD');

export const toDayOfWeek = (xs, fallbackText = '') =>
  moment(xs, moment.ISO_8601).isValid()
    ? moment(xs).parseZone(xs).startOf('day').format('LL')
    : fallbackText;

export const formatNumber = (str, decimalPlaces) => {
  const num = Number(str);

  return (
    num && !Number.isNaN(num)
      ? `${num.toFixed(decimalPlaces)}`
      : compact([
          '0',
          Array.from({ length: decimalPlaces })
            .map(() => '0')
            .join(''),
        ]).join('.')
  ).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const toPrice = (str) => `$${formatNumber(str, 2)}`;

export const toNumber = (str, fallbackText = '') => {
  const num = Number(str);
  return Number.isNaN(num) ? fallbackText : num;
};

export const ellipsis = (str = '', len = 35) =>
  str && str.length > len
    ? `${str.substring(0, len)}...`
    : str;

export const toUpper = (v) =>
  typeof v === 'string' ? v.toUpperCase() : '';

export const encode = (xs) => {
  try {
    return encodeURIComponent(xs);
  } catch (e) {
    return xs;
  }
};

export const makeName = (xs = {}) =>
  compact([xs?.firstName, xs?.lastName]).join(' ') ||
  'Anonymous';

export const removeTrailingSlash = (str) =>
  String(str).replace(/\/$/, '');

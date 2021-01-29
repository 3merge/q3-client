import minimatch from 'minimatch';
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
    ? minimatch(
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

export const toDate = (str, fallbackText = '') =>
  moment(str, moment.ISO_8601).isValid()
    ? moment
        .parseZone(str, moment.HTML5_FMT.DATETIME_LOCAL_MS)
        .format('MMM DD, Y LT')
    : fallbackText;

export const toYearMonthDay = (str) =>
  str !== undefined && str !== null
    ? moment(str).format('YYYY-MM-DD')
    : '';

export const toPrice = (str) => {
  const num = Number(str);
  return (num && !Number.isNaN(num)
    ? `$${num.toFixed(2)}`
    : '$0.00'
  ).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

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

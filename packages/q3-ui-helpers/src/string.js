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

/**
 * Compares two expressions.
 */
export const hasMatch = (target, pattern) =>
  is(target) && is(pattern)
    ? minimatch(
        castToLowercase(target),
        castToLowercase(pattern),
      )
    : false;

/**
 * Turns an expression into yes/no
 */
export const toTruthy = (str, trans) => {
  const t = (v) => (trans ? trans(v) : v);

  return (str === true ||
    str === 'true' ||
    (str && str !== 'false')) &&
    (typeof str !== 'string' || str.toUpperCase() !== 'NO')
    ? t('yes')
    : t('no');
};

const localize = (v) => moment.utc(v).local();

/**
 * Standardize date display.
 */
export const toDate = (str, fallbackText = '') =>
  moment(str, moment.ISO_8601).isValid()
    ? localize(str).format('MMM DD, Y LT')
    : fallbackText;

export const toYearMonthDay = (str) =>
  str !== undefined && str !== null
    ? localize(str).format('YYYY-MM-DD')
    : '';

/**
 * Standardize cost display.
 */
export const toPrice = (str) => {
  const num = Number(str);
  return num && !Number.isNaN(num)
    ? `$${num.toFixed(2)}`
    : '$0';
};

export const toNumber = (str, fallbackText = '') => {
  const num = Number(str);
  return Number.isNaN(num) ? fallbackText : num;
};

/**
 * Reduce the size of a string by truncating it.
 */
export const ellipsis = (str = '', len = 35) =>
  str && str.length > len
    ? `${str.substring(0, len)}...`
    : str;

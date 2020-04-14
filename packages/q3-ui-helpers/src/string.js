import minimatch from 'minimatch';

export const is = (v) => typeof v === 'string';

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

import { compact, isEqual } from 'lodash';

export const clean = (xs) => {
  const str = String(xs).trim();
  return ['', 'undefined', 'null'].includes(str)
    ? null
    : str;
};

export const copyArray = (a) =>
  compact(Array.isArray(a) ? [...a] : []);

export const mergeWithObjectArray = (xs, key, value) => {
  if (!xs) return;
  if (Array.isArray(xs[key])) xs[key].push(value);
  else
    Object.assign(xs, {
      [key]: [value],
    });
};

export const isCleanAndEqual = (a, b) =>
  isEqual(clean(a), clean(b));

export const isUndefined = (str) =>
  typeof str === 'undefined' || str === 'undefined';

/**
 * Some shared style functions.
 */

export const makeSelectedStyle =
  (theme, prop) => (props) => ({
    backgroundColor: props[prop]
      ? theme.palette.secondary.light
      : theme.palette.secondary.default,
    color: props[prop]
      ? theme.palette.secondary.main
      : 'inherit',
  });

export const makeSelectedStyleBorder =
  (theme, prop) => (props) => ({
    '&&:before': {
      backgroundColor: props[prop]
        ? theme.palette.secondary.main
        : 'transparent',
      content: '""',
      height: '2.3rem',
      left: 0,
      position: 'absolute',
      width: 2,
    },
  });

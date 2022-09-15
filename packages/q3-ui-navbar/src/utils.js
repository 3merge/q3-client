import { compact } from 'lodash';

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

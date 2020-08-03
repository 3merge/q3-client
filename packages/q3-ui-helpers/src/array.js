import { difference, uniq } from 'lodash';

import * as string from './string';

/**
 * Mostly used with .find results.
 */
export const hasIndex = (v) => v !== -1;

/**
 * Forces element into an array shape.
 */
export const is = (a) => (Array.isArray(a) ? a : [a]);

/**
 * Remove empty values.
 */
export const condense = (a) => a.flat().filter(Boolean);

export const print = (arr) => is(arr).join(', ');

/**
 * Cast a string to an array.
 */
export const castString = (v) => {
  if (Array.isArray(v)) return v;
  if (typeof v === 'string' && v.length)
    return v.split(',').map((i) => i.trim());

  return [];
};

/**
 * Ensure at least one value.
 */
export const hasLength = (v) =>
  Array.isArray(v) && v.length;

export const filterValue = (a = [], v) =>
  a.filter((i) => i !== v);

export const hasValue = (a = [], v) =>
  hasIndex(a.findIndex((i) => i === v));

/**
 * If adding an existing value, if will instead remove it from the array.
 */
export const addToSet = (a = [], v) => {
  let base = is(a);
  if (hasValue(base, v)) {
    base = filterValue(base, v);
  } else {
    base.push(v);
  }

  return uniq(base.flat());
};

/**
 * Will filter from an array or return empty.
 */
export const pullFromSet = (a = [], v) => {
  return Array.isArray(a) ? filterValue(a, v) : [];
};

/**
 * Remove on match and fill on difference between three targets.
 * The first two are subject to change, while the last determines match or fill.
 */
export const shuffle = (a = [], b = [], c = []) => {
  const has = (item) => !c.includes(item);
  const keepInA = a.filter(has);
  const keepInB = b.filter(has);

  return [
    keepInA.concat(difference(b, keepInB)),
    keepInB.filter(has).concat(difference(a, keepInA)),
  ];
};

/**
 * Checks a term against a set of patterns.
 */
export const matchOnSome = (rules = [], term) =>
  hasLength(rules) && string.is(term)
    ? rules.some((rule) => string.hasMatch(term, rule))
    : false;

/**
 * Filter full array by search term.
 */

export const filterByTerm = (a = [], value) =>
  is(a).filter((item) => {
    if (typeof value !== 'string') return true;
    if (!value.length) return true;

    return JSON.stringify(item)
      .toLowerCase()
      .includes(value.toLowerCase());
  });

export const mergeUnique = (arr1 = [], arr2 = []) =>
  arr1.concat(arr2).reduce((acc, next) => {
    if (!acc.includes(next)) acc.push(next);
    return acc;
  }, []);

export const intersects = (arr1 = [], arr2 = []) =>
  arr1.filter(
    (item) =>
      arr2.findIndex((val) => {
        try {
          return new RegExp(
            `^${val.replace('.$.', '.(\\d+).')}$`,
          ).test(item);
        } catch (e) {
          return val === item;
        }
      }) !== -1,
  );

export const sortByIndexingArray = (
  arr1 = [],
  arr2 = [],
) => {
  const { active, inactive } = arr1.reduce(
    (acc, next) => {
      if (arr2.includes(next)) {
        acc.active.push(next);
      } else {
        acc.inactive.push(next);
      }

      return acc;
    },
    {
      active: [],
      inactive: [],
    },
  );

  return [
    ...active.sort(
      (a, b) => arr2.indexOf(a) - arr2.indexOf(b),
    ),
    ...inactive.sort(),
  ];
};

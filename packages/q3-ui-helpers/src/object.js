import { first, get, last } from 'lodash';
import flat from 'flat';

export const hasKeys = (o) =>
  o !== null &&
  typeof o === 'object' &&
  Object.keys(o).length > 0;

export const countKeys = (o) =>
  hasKeys(o) ? Object.keys(o).length : 0;

export const is = (o) => (hasKeys(o) ? o : {});

export const isFn = (fn) => typeof fn === 'function';

export const isIn = (target, keyName) =>
  hasKeys(target) && keyName in target;

export const invokeSafely = (fn, ...args) =>
  isFn(fn) ? fn(...args) : null;

export const invokeInSafely = (obj, methodName, ...args) =>
  isIn(obj, methodName) && isFn(obj[methodName])
    ? obj[methodName](...args)
    : undefined;

export const getAllPossibleKeys = (a) =>
  Object.keys(
    a.reduce(
      (res, item) => ({
        ...res,
        ...flat(item),
      }),
      {},
    ),
  );

export const fillKeys = (keys, target) =>
  keys.reduce(
    (result, key) =>
      Object.assign(result, {
        [key]: get(target, key, ''),
      }),
    {},
  );

export const clean = (target = {}) =>
  Object.entries(target).reduce((acc, [key, value]) => {
    if (Array.isArray(value)) {
      const inner = value
        .map(clean)
        .filter(Boolean)
        .filter(hasKeys);

      // only allow through populated arrays
      if (inner.length) acc[key] = inner;
    } else if (hasKeys(value)) {
      const inner = clean(value);

      // only allow through populated objects
      if (hasKeys(inner)) acc[key] = inner;

      // only allow through populated values
    } else if (
      value !== null &&
      value !== undefined &&
      typeof value !== 'object'
    ) {
      acc[key] = value;
    }

    return acc;
  }, {});

export const removeUndefinedValuesFromAllArrays = (
  target = {},
) =>
  Object.entries(target).reduce((acc, [key, value]) => {
    if (Array.isArray(value)) {
      acc[key] = value
        .map((item) =>
          hasKeys(item)
            ? removeUndefinedValuesFromAllArrays(item)
            : item,
        )
        .filter((item) => item !== undefined);
    } else if (hasKeys(value)) {
      acc[key] = removeUndefinedValuesFromAllArrays(value);
    } else {
      acc[key] = value;
    }

    return acc;
  }, {});

export const getBottomKey = (v) => last(Object.keys(v));
export const getTopKey = (v) => first(Object.keys(v));

export const toJSON = (xs) => {
  try {
    return JSON.stringify(xs);
  } catch (e) {
    return xs;
  }
};

export const noop = (promise) =>
  promise
    .then(() => {
      // noop
    })
    .catch(() => {
      // noop
    });

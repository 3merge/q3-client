import { get } from 'lodash';
import flat from 'flat';

export const hasKeys = (o) =>
  o !== null &&
  typeof o === 'object' &&
  Object.keys(o).length > 0;

export const isFn = (fn) => typeof fn === 'function';

export const invokeSafely = (fn) =>
  isFn(fn) ? fn() : null;

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
    } else if (value !== null && value !== undefined) {
      acc[key] = value;
    }

    return acc;
  }, {});

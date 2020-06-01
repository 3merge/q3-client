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

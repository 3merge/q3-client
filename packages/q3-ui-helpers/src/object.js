export const hasKeys = (o) =>
  o !== null &&
  typeof o === 'object' &&
  Object.keys(o).length > 0;

export const isFn = (fn) => typeof fn === 'function';

export const invokeSafely = (fn) =>
  isFn(fn) ? fn() : null;

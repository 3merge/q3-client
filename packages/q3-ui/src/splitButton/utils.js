const isObject = (v) => typeof v === 'object' && v !== null;

const getByIndex = (a = [], i) =>
  isObject(a[i]) ? a[i] : {};

const mapClickHandler = (a = [], next) =>
  a.map((option, index) => ({
    onClick: () => next(index),
    ...option,
  }));

export const invokeHandlerByIndex = (
  opts = [],
  ind = 0,
) => () =>
  isObject(opts[ind]) && 'handler' in opts[ind]
    ? opts[ind].handler()
    : null;

export const setActiveIndex = (opts = [], next) =>
  mapClickHandler(opts, next);

export const getLabelByIndex = (opts = [], i) =>
  getByIndex(opts, i).label;

export const getDescriptionByIndex = (opts = [], i) =>
  getByIndex(opts, i).description;

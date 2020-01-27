const isObject = (v) => typeof v === 'object' && v !== null;

export const invokeHandlerByIndex = (
  opts = [],
  ind = 0,
) => () =>
  isObject(opts[ind]) && 'handler' in opts[ind]
    ? opts[ind].handler()
    : null;

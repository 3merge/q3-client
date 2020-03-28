/**
 * Mostly used with .find results.
 */
export const hasIndex = (v) => v !== -1;

/**
 * Forces element into an array shape.
 */
export const is = (a) => (Array.isArray(a) ? a : [a]);

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
  if (!Array.isArray(a)) return [v].flat();
  if (Array.isArray(v)) return v;
  if (hasValue(a, v)) return filterValue(a, v);
  return a.concat(v);
};

/**
 * Well filter from an array or return empty.
 */
export const pullFromSet = (a = [], v) => {
  return Array.isArray(a) ? filterValue(a, v) : [];
};

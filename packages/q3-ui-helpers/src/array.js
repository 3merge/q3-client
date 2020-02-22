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

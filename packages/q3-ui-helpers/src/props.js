import { get } from 'lodash';
import { is } from './array';
/**
 * Great for prop-checking during Component cloning/creation.
 */
export const has = (v) =>
  Object.keys(get(v, 'props', {})).length;

/**
 * Invoke a func if children exist.
 */
export const callOnChildren = (v, fn) => {
  const c = get(v, 'props.children');
  if (typeof fn !== 'function') return undefined;
  return Array.isArray(c) ? c.map(fn) : fn(c);
};

export const isNotEmpty = (v) =>
  v !== null && v !== undefined && v.length;

export const mapBy = (c, propName) =>
  is(c).flatMap((item) =>
    [
      get(item, `props.${propName}`),
      mapBy(
        get(item, 'props.children', []),
        propName,
      ).filter(isNotEmpty),
    ].flat(),
  );

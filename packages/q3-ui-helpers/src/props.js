import { get } from 'lodash';
import { is } from './array';
/**
 * Great for prop-checking during Component cloning/creation.
 */
export const has = (v) =>
  v &&
  'props' in v &&
  typeof v.props === 'object' &&
  Object.keys(v.props).length;

/**
 * Invoke a func if children exist.
 */
export const callOnChildren = (v, fn) => {
  const c = get(v, 'props.children');
  if (typeof fn !== 'function') return undefined;
  return Array.isArray(c) ? c.map(fn) : fn(c);
};

export const mapBy = (c, propName) =>
  is(c).map((item) => get(item, `props.${propName}`));

import { array } from 'q3-ui-helpers';
import { orderBy, sortBy, isFunction } from 'lodash';

export const checkValues = (original, transformed) =>
  original.length &&
  (transformed.length || Object.keys(transformed).length);

export const haveLength = (...args) =>
  args.every(array.hasLength);

const testSearchTerm = (val) => (item) =>
  !val.length ||
  new RegExp(val, 'gi').test(JSON.stringify(item));

export const search = (searchTerm) => (xs) =>
  searchTerm ? xs.filter(testSearchTerm(searchTerm)) : xs;

export const filter = (obj) => (xs) => {
  if (!array.hasLength(xs) || !obj || !obj.fn) return xs;
  return xs.filter(obj.fn);
};

export const sort = (obj) => (xs) => {
  if (!array.hasLength(xs) || !obj) return xs;
  const { label, fn = null, direction = 'asc' } = obj;

  return orderBy(
    xs,
    [isFunction(fn) ? fn : label],
    [direction],
  );
};

const OTHER = 'other';

export const genNewShape = (groupBy) => {
  const base = groupBy.reduce((acc, option) => {
    acc[option.label] = [];
    return acc;
  }, {});
  return { ...base, [OTHER]: [] };
};

export const group = (groupBy) => (xs) => {
  if (!array.hasLength(groupBy) || !array.hasLength(xs))
    return xs;

  return xs.reduce((acc, x) => {
    // eslint-disable-next-line array-callback-return
    const wasTrue = groupBy.some(({ label, fn }) => {
      if (fn(x)) {
        acc[label].push(x);
        return true;
      }
      return false;
    });
    if (!wasTrue) {
      acc[OTHER].push(x);
    }
    return acc;
  }, genNewShape(groupBy));
};

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'filterBy':
      return {
        ...state,
        filterBy: payload,
      };

    case 'sortBy':
      return {
        ...state,
        sortBy: payload,
      };

    case 'input':
      return {
        ...state,
        input: payload,
      };

    default:
      return state;
  }
};

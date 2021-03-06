import {
  compact,
  isPlainObject,
  isObject,
  size,
} from 'lodash';
import Comparison from 'comparisons';
import micromatch from 'micromatch';
import { array } from 'q3-ui-helpers';

export const filterbyColl = (a, name) =>
  a.filter((v) => v.coll.localeCompare(name) === 0);

export const findByOp = (a, op) =>
  a && a.length
    ? a.find(
        (grant) =>
          // the default for undefined inClient values is true
          // this differs from the Read op, which is somewhere else
          grant.op === op && grant.inClient !== false,
      )
    : null;

export const isDefined = (arg) =>
  arg !== undefined && arg !== null;

export const satisfiesOwnership = (grant, id, createdBy) =>
  grant &&
  grant.ownership === 'Own' &&
  grant.op !== 'Create'
    ? id === createdBy
    : true;

const formatGlobRule = (xs = {}) => {
  let output = xs.glob;
  if (xs.wildcard) output = `*${output}*`;
  if (xs.negate) output = `!${output}`;
  return output;
};

// directly from the server
const cleanFields = (xs, target) => {
  const out = compact(
    array.is(xs).map((item) => {
      if (!item) return null;
      if (!isPlainObject(item)) return item;

      return !item.test ||
        new Comparison(item.test).eval(target)
        ? formatGlobRule(item)
        : null;
    }),
  ).sort((a, b) => {
    if (b.startsWith('!')) return -1;
    return 0;
  });

  return out.length ? out : '*';
};

const hasTest = (xs) => size(xs?.test) > 0;

const removeNegations = (xs) =>
  String(xs).replace(/!/g, '');

export const isDynamicField = (grant, name) => {
  return grant?.fields
    ? micromatch.isMatch(
        name,
        array
          .is(grant?.fields)
          .filter(isObject)
          .filter(hasTest)
          .map(formatGlobRule)
          .map(removeNegations),
      )
    : false;
};

export const hasField = (grant, name, doc) => {
  if (!name) return true;
  if (!grant?.fields) return false;

  return (
    size(
      // @note
      // cannot use .isMatch as it does not yield the same
      // results as over the api
      micromatch([name], cleanFields(grant.fields, doc)),
    ) > 0
  );
};

export const invoke = (fn, args) =>
  typeof fn === 'function' ? fn(args) : null;

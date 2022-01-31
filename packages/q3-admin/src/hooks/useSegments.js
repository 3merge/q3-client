import { useLocation } from '@reach/router';
import { useQueryParams } from 'q3-ui-queryparams';
import {
  filter,
  get,
  isEqual,
  map,
  last,
  compact,
  omit,
  isObject,
} from 'lodash';

const countDiff = (a, assertion) =>
  Object.entries(a).reduce((acc, [key, value]) => {
    if (assertion(key, value)) return acc + 1;
    return acc;
  }, 0);

const sortValue = (xs) =>
  Array.isArray(xs) ? xs.sort() : xs;

const applyFunctionToKeyValuePair = (fn, xs) => (k, v) =>
  fn(sortValue(get(xs, k)), sortValue(v));

const negate =
  (fn) =>
  (...args) =>
    !fn(...args);

const contains = (a, b) =>
  countDiff(a, applyFunctionToKeyValuePair(isEqual, b), 0);

const containsNot = (a, b) =>
  countDiff(
    a,
    applyFunctionToKeyValuePair(negate(isEqual), b),
    0,
  );

const hasMax = (maxValue) => (xs) =>
  xs.containsNot > 0 ? false : xs.contains === maxValue;

const omitReservedWords = (xs) =>
  omit(xs, ['sort', 'page', 'limit', 'active']);

export const mapSegmentsToListData = (xs) =>
  isObject(xs)
    ? Object.entries(xs).map(([key, value]) => ({
        label: key,
        searchValue: value,
        value,
      }))
    : [];

export default (segments = []) => {
  const qp = useQueryParams();
  const decodedSearchParams = qp.decode(
    useLocation()?.search,
  );

  const runDecodedObjectsAgainst = (xs) => (fn) =>
    fn(
      omitReservedWords(xs),
      omitReservedWords(decodedSearchParams),
    );

  const segmentsWithStats = map(segments, (segment) => {
    const decoded = qp.decode(segment.value);
    const rd = runDecodedObjectsAgainst(decoded);

    return {
      ...segment,
      contains: rd(contains),
      containsNot: rd(containsNot),
      decoded,
    };
  });

  const max = Math.max(
    ...map(segmentsWithStats, 'contains'),
  );

  const active = last(
    compact(
      map(filter(segmentsWithStats, hasMax(max)), 'label'),
    ),
  );

  return {
    active,
    segments: map(segmentsWithStats, (item) => ({
      isActive: active === item.label,
      ...item,
    })),
  };
};

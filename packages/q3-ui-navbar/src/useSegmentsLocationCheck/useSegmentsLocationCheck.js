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
  find,
} from 'lodash';
import { clean, isCleanAndEqual } from '../utils';

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

export default () => {
  const qp = useQueryParams();
  const searchString = useLocation()?.search;
  const decodedSearchParams = qp.decode(searchString);

  const reportFolderIds = (xs = [], id = null) => {
    const lookupResults = [];
    const lookup = (targetId) => {
      if (targetId) {
        const f = find(
          xs,
          (item) =>
            isCleanAndEqual(item.id, targetId) &&
            item.folder,
        );

        if (f) {
          lookupResults.push(f.id);
          lookup(f.folderId);
        }
      }
    };

    lookup(id);
    return lookupResults;
  };

  const runDecodedObjectsAgainst = (xs) => (fn) =>
    fn(
      omitReservedWords(xs),
      omitReservedWords(decodedSearchParams),
    );

  return {
    check(segments = []) {
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
        compact(filter(segmentsWithStats, hasMax(max))),
      );

      const containsAppliedFolderIds = reportFolderIds(
        segments,
        active?.folderId,
      );

      return map(segmentsWithStats, (item) => ({
        applied: item.folder
          ? containsAppliedFolderIds.includes(item.id)
          : isCleanAndEqual(active.label, item.label),
        ...item,
      }));
    },

    // allows us to watch as a dep
    state: searchString,
  };
};

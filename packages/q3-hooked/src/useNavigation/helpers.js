import { array } from 'q3-ui-helpers';
import { QueryStringMatcher } from '../../../q3-admin/src/helpers';

const isRoot = (s) => s === '/';

const isRelativePath = (s) =>
  s.length && !s.startsWith('/');

const isEqualOrIncludes = (x, y) =>
  x === y || x.includes(y);

export const isPartialMatch = (a = '', b = '') => {
  try {
    if (isRoot(a)) return a === b;
    if (isRelativePath(b) && a) return a.includes(b);

    const x = QueryStringMatcher.clean(a);
    const y = QueryStringMatcher.clean(b);

    return isEqualOrIncludes(y, x);
  } catch (e) {
    return false;
  }
};

const collectPartialMatch = (x, y) =>
  isPartialMatch(x, y) ? x : [];

export const getPartialMatch = (pathname, a = []) =>
  a
    .flatMap((item) => {
      const out = [];
      if (item.nestedMenuItems) {
        out.push(
          getPartialMatch(pathname, item.nestedMenuItems),
        );
      }
      return out
        .concat(collectPartialMatch(item.to, pathname))
        .flat();
    })
    .filter(Boolean);

export const getParentMatch = (pathname, a = []) =>
  a
    .map((item) => {
      if (!item.nestedMenuItems) return null;

      const matched = item.nestedMenuItems.find((nest) => {
        if (nest.nestedMenuItems) {
          const result = getParentMatch(
            pathname,
            nest.nestedMenuItems,
          );
          return array.hasLength(result) ? result : false;
        }
        return isPartialMatch(pathname, nest.to);
      });
      return matched ? item.label : null;
    })
    .filter(Boolean);

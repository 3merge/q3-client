import React from 'react';
import { curryN } from 'lodash/fp';
import { array, object } from 'q3-ui-helpers';
import { QueryStringMatcher } from '../../../q3-admin/src/helpers';

export const isPartialMatch = (a = '', b = '') => {
  try {
    // root directory
    if (a === '/') return a === b;

    // relative paths
    if (!b.startsWith('/') && a && b) return a.includes(b);

    const x = QueryStringMatcher.clean(a);
    const y = QueryStringMatcher.clean(b);
    return x === y || y.includes(x);
  } catch (e) {
    return false;
  }
};

export const filterByVisibility = (a = []) =>
  array.hasLength(a)
    ? a.filter((item) => {
        return (
          array.hasLength(item.nestedMenuItems) ||
          (object.isIn(item, 'visible') && item.visible)
        );
      })
    : [];

export const recursivelyRenderMenuItems = (Tree, Link) => (
  items,
) =>
  array.hasLength(items)
    ? items.map((item) => {
        const nodeId = item.to || item.label;
        const sub = filterByVisibility(
          item.nestedMenuItems,
        );

        const render = sub.length > 0 || item.to;

        return render
          ? React.createElement(
              Tree,
              {
                className: 'q3-admin-menu-item',
                nodeId,
                key: nodeId,
                label: React.createElement(Link, {
                  ...item,
                }),
              },
              recursivelyRenderMenuItems(Tree, Link)(sub),
            )
          : null;
      })
    : null;

export const getPartialMatch = (location) => (a = []) =>
  a
    .flatMap((item) => {
      const out = [];
      if (item.nestedMenuItems) {
        out.push(
          getPartialMatch(location)(item.nestedMenuItems),
        );
      }
      return out
        .concat(
          isPartialMatch(item.to, location.pathname)
            ? item.to
            : [],
        )
        .flat();
    })
    .filter(Boolean);

export const getParentMatch = (location) => (a = []) =>
  a
    .map((item) => {
      if (!item.nestedMenuItems) return null;
      const matched = item.nestedMenuItems.find((nest) => {
        if (nest.nestedMenuItems) {
          return getParentMatch(nest.nestedMenuItems);
        }

        return isPartialMatch(nest.to, location.pathname);
      });

      return matched ? item.label : null;
    })
    .filter(Boolean);

const useNavigation = () => ({
  filterByVisibility,
  recursivelyRenderMenuItems,
  getPartialMatch: curryN(2, getPartialMatch),
  getParentMatch: curryN(2, getParentMatch),
});

export default useNavigation;

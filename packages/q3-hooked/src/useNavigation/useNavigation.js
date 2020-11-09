import React from 'react';
import { array, object } from 'q3-ui-helpers';
import { QueryStringMatcher } from '../../../q3-admin/src/helpers';

export const isPartialMatch = (to = '', location = '') => {
  try {
    // root directory
    if (to === '/') return to === location;
    // relative paths
    if (!location.startsWith('/') && to && location)
      return to.includes(location);

    const x = QueryStringMatcher.clean(to);
    const y = QueryStringMatcher.clean(location);
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

export const getPartialMatch = (location, a = []) =>
  a
    .flatMap((item) => {
      const out = [];
      if (item.nestedMenuItems) {
        out.push(
          getPartialMatch(location, item.nestedMenuItems),
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

export const getParentMatch = (location, a = []) => {
  return a
    .map((item) => {
      if (!item.nestedMenuItems) return null;
      const matched = item.nestedMenuItems.find((nest) => {
        if (nest.nestedMenuItems) {
          const result = getParentMatch(
            location,
            nest.nestedMenuItems,
          );
          return result.length ? result : false;
        }
        // return isPartialMatch(nest.to, location.pathname);
        return isPartialMatch(location.pathname, nest.to);
      });
      return matched ? item.label : null;
    })
    .filter(Boolean);
};

const useNavigation = () => ({
  filterByVisibility,
  recursivelyRenderMenuItems,
  getPartialMatch,
  getParentMatch,
});

export default useNavigation;

import React from 'react';
import { compose } from 'lodash/fp';
import { useLocation } from '@reach/router';
import { array, object } from 'q3-ui-helpers';
import { QueryStringMatcher } from '../../../q3-admin/src/helpers';

const isRoot = (s) => s === '/';
const isRelativePath = (s) =>
  s.length && !s.startsWith('/');

export const isPartialMatch = (a = '', b = '') => {
  try {
    if (isRoot(a)) return a === b;
    if (isRelativePath(b) && a) return a.includes(b);

    const x = QueryStringMatcher.clean(a);
    const y = QueryStringMatcher.clean(b);

    return x === y || y.includes(x);
  } catch (e) {
    return false;
  }
};

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
        .concat(
          isPartialMatch(item.to, pathname) ? item.to : [],
        )
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
          return result.length ? result : false;
        }
        return isPartialMatch(pathname, nest.to);
      });
      return matched ? item.label : null;
    })
    .filter(Boolean);

export const filterByVisibility = (a = []) =>
  array.hasLength(a)
    ? a.filter(
        (item) =>
          array.hasLength(item.nestedMenuItems) ||
          (object.isIn(item, 'visible') && item.visible),
      )
    : [];

export const recursivelyRenderMenuItems = (items) => (
  Tree,
  Link,
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
              recursivelyRenderMenuItems(sub)(Tree, Link),
            )
          : null;
      })
    : null;

const useNavigation = (menuItems) => {
  const { pathname } = useLocation();
  const renderMenuItems = compose(
    recursivelyRenderMenuItems,
    filterByVisibility,
  )(menuItems);

  return {
    filterByVisibility,
    defaultExpanded: getParentMatch(pathname, menuItems),
    defaultSelected: getPartialMatch(pathname, menuItems),
    renderMenuItems,
    recursivelyRenderMenuItems,
  };
};

export default useNavigation;

import React from 'react';
import { compose } from 'lodash/fp';
import { useLocation } from '@reach/router';
import { array, object } from 'q3-ui-helpers';
import { getParentMatch, getPartialMatch } from './helpers';

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

        const render = array.hasLength(sub) || item.to;

        return render
          ? React.createElement(
              Tree,
              {
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
    defaultExpanded: getParentMatch(pathname, menuItems),
    defaultSelected: getPartialMatch(pathname, menuItems),
    renderMenuItems,
  };
};

export default useNavigation;

import React from 'react';
import { compose } from 'lodash/fp';
import { useLocation } from '@reach/router';
import { array, object } from 'q3-ui-helpers';
import { getParentMatch, getPartialMatch } from './helpers';

// const curryRenderMenuItems = compose(
//   recursivelyRenderMenuItems,
//   filterByVisibility,
// );

// export function filterByVisibility(a = []) {
//   return array.hasLength(a)
//     ? a.filter(
//         (item) =>
//           array.hasLength(item.nestedMenuItems) ||
//           (object.isIn(item, 'visible') && item.visible),
//       )
//     : [];
// }

// export function recursivelyRenderMenuItems(items) {
//   return (Tree, Link) =>
//     array.hasLength(items)
//       ? items.map((item) => {
//           const nodeId = item.to || item.label;
//           const sub = curryRenderMenuItems(
//             item.nestedMenuItems,
//           );

//           return sub || item.to
//             ? React.createElement(
//                 Tree,
//                 {
//                   nodeId,
//                   key: nodeId,
//                   label: React.createElement(Link, {
//                     ...item,
//                   }),
//                 },
//                 sub(Tree, Link),
//               )
//             : null;
//         })
//       : null;
// }

// export const transformer = (checkSelected) => ({
//   label,
//   to,
//   icon,
//   nestedMenuItems,
// }) => {
//   const rest = nestedMenuItems
//     ? { nestedMenuItems: nestedMenuItems.map(transformer) }
//     : { to, isSelected: checkSelected(to) };

//   return {
//     label,
//     icon,
//     ...rest,
//   };
// };

const useNavigation = (menuItems = []) => {
  const { pathname } = useLocation();

  const checkSelected = (to) => {
    const path = pathname.split('/');
    const target = `/${path[path.length - 1]}`;
    return target === to;
  };

  const transformer = ({
    label,
    to,
    icon,
    nestedMenuItems,
  }) => {
    const rest = nestedMenuItems
      ? {
          nestedMenuItems: nestedMenuItems.map(transformer),
          isExpanded: false,
        }
      : { to, isSelected: checkSelected(to) };

    return {
      label,
      icon,
      ...rest,
    };
  };

  const newMenuItems = menuItems.map(transformer);

  return {
    defaultExpanded: getParentMatch(pathname, menuItems),
    defaultSelected: getPartialMatch(pathname, menuItems),
    navigationMenus: newMenuItems,
  };

  // return {
  //   defaultExpanded: getParentMatch(pathname, menuItems),
  //   defaultSelected: getPartialMatch(pathname, menuItems),
  //   renderMenuItems: curryRenderMenuItems(menuItems),
  // };
};

export default useNavigation;

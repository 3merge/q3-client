import React from 'react';
import { compose } from 'lodash/fp';
import { useNavigate, useLocation } from '@reach/router';
import { array, object } from 'q3-ui-helpers';
import { getParentMatch, getPartialMatch } from './helpers';

export const hyphenateIndexPosition = (
  prevIndex,
  currIndex,
) => {
  const inc = currIndex + 1;
  return String(prevIndex ? `${prevIndex}-${inc}` : inc);
};

export const findFirstSelectedItemInMenu = (
  menuItems = [],
) =>
  menuItems.reduce((acc, curr) => {
    const findActive = ({
      nodeId,
      nestedMenuItems: sub,
      isSelected,
    }) => {
      // eslint-disable-next-line
      if (isSelected) acc = nodeId;
      if (Array.isArray(sub)) sub.forEach(findActive);
    };

    findActive(curr);
    return acc;
  }, '');

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
  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState('');
  const { pathname } = useLocation();

  const checkExpanded = (value) =>
    typeof expanded === 'string'
      ? expanded.startsWith(value)
      : false;

  const checkSelected = (to) => {
    const path = pathname.split('/');
    const target = `/${path[path.length - 1]}`;
    return target === to;
  };

  const handleOnClick = (curr) => (e) => {
    e.preventDefault();
    setExpanded(curr);
  };

  const transformer = (prevIndex) => (
    { label, to, icon, nestedMenuItems },
    currIndex,
  ) => {
    const curr = hyphenateIndexPosition(
      prevIndex,
      currIndex,
    );

    const rest = nestedMenuItems
      ? {
          nestedMenuItems: nestedMenuItems.map(
            transformer(curr),
          ),
          isExpanded: checkExpanded(curr),
          onClick: handleOnClick(curr),
          nodeId: curr,
        }
      : {
          to,
          role: 'link',
          onClick: () => navigate(to),
          isSelected: checkSelected(to),
          nodeId: curr,
        };

    return {
      label,
      icon,
      ...rest,
    };
  };

  const newMenuItems = menuItems.map(transformer());

  React.useEffect(() => {
    const active = findFirstSelectedItemInMenu(
      newMenuItems,
    );

    if (active) setExpanded(active);
  }, [pathname]);

  return {
    defaultExpanded: getParentMatch(pathname, menuItems),
    defaultSelected: getPartialMatch(pathname, menuItems),
    navigationMenus: newMenuItems,

    recurse: (List, ListItem) => {
      const Menu = ({
        nestedMenuItems,
        isExpanded,
        onClick,
        ...rest
      }) => {
        const nests = nestedMenuItems?.length > 0;
        const withControls = (renderer) => {
          return (
            <div
              {...rest}
              onClick={onClick}
              style={{
                background: isExpanded ? 'orange' : 'blue',
              }}
            >
              {renderer}
            </div>
          );
        };

        return (
          <>
            {nests ? (
              <ListItem
                {...rest}
                withControls={withControls}
              >
                {nests && isExpanded && (
                  <List>
                    {nestedMenuItems.map((it, i) => (
                      <Menu
                        {...it}
                        key={`nestsIsExpanded${it.label}${i}`}
                      />
                    ))}
                  </List>
                )}
              </ListItem>
            ) : (
              <ListItem
                withControls={withControls}
                {...rest}
              />
            )}
          </>
        );
      };
      return (
        <List top>
          {newMenuItems.map((item, i) => {
            return (
              <Menu
                {...item}
                key={`top${item.label}${i}`}
              />
            );
          })}
        </List>
      );
    },
  };
};

export default useNavigation;

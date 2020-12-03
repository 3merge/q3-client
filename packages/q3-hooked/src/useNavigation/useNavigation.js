import React from 'react';
import { useNavigate, useLocation } from '@reach/router';
import { array, object } from 'q3-ui-helpers';

const filterByVisibility = (a = []) =>
  array.hasLength(a)
    ? a.filter(
        (item) =>
          array.hasLength(item.nestedMenuItems) ||
          (object.isIn(item, 'visible') && item.visible),
      )
    : [];

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
    if (curr === expanded) {
      if (expanded.length === 1) {
        setExpanded('');
      }

      if (expanded.length > 2) {
        setExpanded(expanded.slice(0, expanded.length - 2));
      }
    } else {
      setExpanded(curr);
    }
  };

  const transformer = (prevIndex) => (
    { label, to, icon, nestedMenuItems, visible },
    currIndex,
  ) => {
    const curr = hyphenateIndexPosition(
      prevIndex,
      currIndex,
    );

    const isVisible =
      typeof visible === 'boolean' ? { visible } : {};

    const rest = nestedMenuItems
      ? {
          nestedMenuItems: nestedMenuItems.map(
            transformer(curr),
          ),
          isExpanded: checkExpanded(curr),
          onClick: handleOnClick(curr),
          nodeId: curr,
          ...isVisible,
        }
      : {
          to,
          role: 'link',
          onClick: () => navigate(to),
          isSelected: checkSelected(to),
          nodeId: curr,
          ...isVisible,
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
    navigationMenus: filterByVisibility(newMenuItems),
  };
};

export default useNavigation;

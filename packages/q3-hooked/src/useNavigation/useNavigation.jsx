import React from 'react';
import { useNavigate, useLocation } from '@reach/router';
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
  };
};

export default useNavigation;

import React from 'react';
import IconList from '../IconList';
import IconRail from '../IconRail';
import usePages from '../usePages';

const MenuSystemCollapsed = ({ pages }) => {
  const { pages: items } = usePages(pages);

  return (
    <IconRail>
      <IconList items={items} />
    </IconRail>
  );
};

export default MenuSystemCollapsed;

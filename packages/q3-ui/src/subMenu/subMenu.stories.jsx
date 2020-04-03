import React from 'react';
import SubMenu, { SubMenuItem } from './subMenu';

export default {
  title: 'Q3 UI|Components/SubMenu',
  parameters: {
    component: SubMenu,
    componentSubtitle: 'Expandable menu items',
  },
};

export const Demo = () => (
  <SubMenu>
    <SubMenuItem
      label="Dropdown"
      renderer={() => 'Interior!'}
    />
    <SubMenuItem
      label="Dropdown2"
      renderer={() => 'Interior 2!'}
    />
    <SubMenuItem
      label="Dropdown3"
      renderer={() => 'Interior 3!'}
    />
  </SubMenu>
);

import React from 'react';
import { Link } from '@reach/router';
import Location from 'q3-ui-test-utils/lib/location';
import SubMenu, { SubMenuItem } from './subMenu';

export default {
  title: 'Q3 UI|Components/SubMenu',
  parameters: {
    component: SubMenu,
    componentSubtitle: 'Expandable menu items',
  },
};

export const Demo = () => (
  <Location initialPath="/">
    <SubMenu>
      <SubMenuItem
        label="Dropdown"
        renderer={() => <Link to="sub">Sub</Link>}
      />
      <SubMenuItem
        label="Dropdown2"
        renderer={() => <Link to="sub1">Sub1</Link>}
      />
      <SubMenuItem
        label="Dropdown3"
        renderer={() => <Link to="sub2">Sub2</Link>}
      />
    </SubMenu>
  </Location>
);

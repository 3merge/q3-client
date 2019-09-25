import React from 'react';
import { storiesOf } from '@storybook/react';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '../menu';
import Offcanvas from '.';

const menuItems = [
  {
    href: 'foo',
    label: 'Foo',
    visible: true,
  },
  {
    href: 'bar',
    label: 'Bar',
    visible: true,
  },
  {
    href: 'qux',
    label: 'Qux',
    visible: true,
  },
];

storiesOf('Components|Offcanvas', module).add(
  'Default',
  () => (
    <Offcanvas
      menu={() => (
        <Menu title="Subtitle" items={menuItems} />
      )}
    >
      {(toggle) => (
        <Fab onClick={toggle}>
          <MenuIcon />
        </Fab>
      )}
    </Offcanvas>
  ),
);

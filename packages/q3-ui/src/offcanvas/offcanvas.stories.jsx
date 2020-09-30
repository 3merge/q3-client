import React from 'react';
import { storiesOf } from '@storybook/react';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '../menu';
import Offcanvas from '.';

const menuItems = [
  {
    to: 'foo',
    label: 'Foo',
    visible: true,
  },
  {
    to: 'bar',
    label: 'Bar',
    visible: true,
  },
  {
    to: 'qux',
    label: 'Qux',
    visible: true,
  },
];

storiesOf('Components/Offcanvas', module).add(
  'Default',
  () => (
    <Offcanvas
      menu={({ close }) => (
        <Menu
          title="Subtitle"
          items={menuItems}
          done={close}
        />
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

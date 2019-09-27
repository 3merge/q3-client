import React from 'react';
import { storiesOf } from '@storybook/react';
import ProfileBar from '.';
import Docs from './README.md';
import Menu from '../menu';

const menuItems = [
  {
    label: 'Profile',
    onClick: () => null,
  },
];

const OffcanvasMenu = () => (
  <Menu
    title="Common"
    items={[
      {
        label: 'Dashboard',
        href: '/',
        visible: true,
      },
    ]}
  />
);

storiesOf('Components|Profile bar', module)
  .addParameters({
    jest: ['profileBar'],
    readme: {
      sidebar: Docs,
    },
  })
  .add('Responsive', () => (
    <ProfileBar name="Hooli" offcanvas={OffcanvasMenu} />
  ));

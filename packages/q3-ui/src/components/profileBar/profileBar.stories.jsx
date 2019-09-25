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
  .add('Unpopulated', () => (
    <ProfileBar offcanvas={OffcanvasMenu} />
  ))
  .add('With profile', () => (
    <ProfileBar
      name="Jon Doe"
      imgSrc="https://picsum.photos/200/300"
      offcanvas={OffcanvasMenu}
    />
  ))
  .add('With profile and support', () => (
    <ProfileBar
      name="Jon Doe"
      menuItems={menuItems}
      supportDeskUrl="https://google.ca"
      docs="https://google.ca"
      offcanvas={OffcanvasMenu}
    />
  ));

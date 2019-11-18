import React from 'react';
import { storiesOf } from '@storybook/react';
import ProfileBar from '.';
import Docs from './README.md';
import Menu from '../menu';

const OffcanvasMenu = () => (
  <Menu
    title="Common"
    items={[
      {
        label: 'Dashboard',
        to: '/',
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

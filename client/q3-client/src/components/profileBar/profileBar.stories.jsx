import React from 'react';
import { storiesOf } from '@storybook/react';
import ProfileBar from '.';
import Docs from './README.md';

const menuItems = [
  {
    label: 'Profile',
    onClick: () => null,
  },
];

storiesOf('Components|Profile bar', module)
  .addParameters({
    jest: ['profileBar'],
    readme: {
      sidebar: Docs,
    },
  })
  .add('Unpopulated', () => <ProfileBar />)
  .add('With profile', () => (
    <ProfileBar
      name="Jon Doe"
      imgSrc="https://picsum.photos/200/300"
    />
  ))
  .add('With profile and support', () => (
    <ProfileBar
      name="Jon Doe"
      menuItems={menuItems}
      supportDeskUrl="https://google.ca"
      docs="https://google.ca"
    />
  ));

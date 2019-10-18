import React from 'react';
import { storiesOf } from '@storybook/react';
import Assignment from '@material-ui/icons/Assignment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Docs from './README.md';
import Menu from '.';

const MenuImplementationStory = () => (
  <Menu
    title="My menu"
    color="orange"
    items={[
      {
        to: 'one',
        label: 'Link One',
        Icon: Assignment,
        visible: true,
      },
      {
        to: 'huu',
        visible: false,
      },
      {
        to: 'three',
        label: 'Link Three (Link Two Invisible)',
        Icon: AccountCircle,
        visible: true,
      },
      {
        to: 'https://google.ca',
        label: 'Link Four (External)',
        Icon: AccountCircle,
        visible: true,
      },
    ]}
  />
);

export default MenuImplementationStory;

storiesOf('Components|Menu', module)
  .addParameters({
    jest: ['menu'],
    readme: {
      sidebar: Docs,
    },
  })
  .add('Default', () => <MenuImplementationStory />, {
    router: 'one',
  });

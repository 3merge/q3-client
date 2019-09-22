import React from 'react';
import { storiesOf } from '@storybook/react';
import Sidebar from '.';
import Docs from './README.md';
import Menu from '../menu/menu.stories';

storiesOf('Components|Sidebar', module)
  .addParameters({
    jest: ['profileBar'],
    readme: {
      sidebar: Docs,
    },
  })
  .add('Default', () => (
    <Sidebar renderTrigger={() => null}>
      Stuff goes here!
    </Sidebar>
  ))
  .add('With overflow', () => (
    <Sidebar renderTrigger={() => null}>
      <div style={{ height: '200vh' }} />
    </Sidebar>
  ))
  .add('With menu', () => (
    <Sidebar renderTrigger={() => null}>
      <Menu />
    </Sidebar>
  ));

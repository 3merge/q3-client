import React from 'react';
import { storiesOf } from '@storybook/react';
import Docs from './README.md';
import Title from '.';

storiesOf('Components|Title', module)
  .addParameters({
    jest: ['title'],
    readme: {
      sidebar: Docs,
    },
  })
  .add('Default render', () => (
    <Title title="Page title goes here" />
  ));

import React from 'react';
import { storiesOf } from '@storybook/react';
import Tel from '.';
import docs from './README.md';

storiesOf('Components/Tel', module)
  .addParameters({
    jest: ['tel'],
    readme: {
      sidebar: docs,
    },
  })
  .add('As link', () => <Tel number="905-999-3249" />);

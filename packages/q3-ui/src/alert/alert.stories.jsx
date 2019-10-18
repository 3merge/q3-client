import React from 'react';
import { storiesOf } from '@storybook/react';
import docs from './README.md';
import Alert from '.';

storiesOf('Components|Alert', module)
  .addParameters({
    jest: ['alert'],
    readme: {
      sidebar: docs,
    },
  })
  .add('Default', () => <Alert label="cookies" link="/" />)
  .add('Error', () => <Alert label="whoops" type="error" />)
  .add('Success', () => (
    <Alert label="yay!" type="success" />
  ));

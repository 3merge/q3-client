import React from 'react';
import { storiesOf } from '@storybook/react';
import Box from '@material-ui/core/Box';
import docs from './README.md';
import Alert from '.';

storiesOf('Components|Alert', module)
  .addParameters({
    jest: ['alert'],
    readme: {
      sidebar: docs,
    },
  })
  .add('Error', () => <Alert label="whoops" type="error" />)
  .add('Warning', () => (
    <Alert label="hmm..." type="warning" />
  ))
  .add('Success', () => (
    <Alert label="yay!" type="success" />
  ));

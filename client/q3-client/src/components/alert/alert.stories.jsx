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
  .add('Error', () => (
    <Box p={4}>
      <Alert label="whoops" type="error" />
    </Box>
  ))
  .add('Warning', () => (
    <Box p={4}>
      <Alert label="hmm..." type="warning" />
    </Box>
  ))
  .add('Success', () => (
    <Box p={4}>
      <Alert label="yay!" type="success" />
    </Box>
  ));

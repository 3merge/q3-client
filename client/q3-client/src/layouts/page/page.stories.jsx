import React from 'react';
import { storiesOf } from '@storybook/react';
import { Typography } from '@material-ui/core';
import Page from '.';

storiesOf('Layouts|Page', module).add('Default', () => (
  <Page title="My Page View">
    <Typography>Pass any child!</Typography>
  </Page>
));

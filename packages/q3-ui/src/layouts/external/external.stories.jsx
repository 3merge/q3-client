import React from 'react';
import { storiesOf } from '@storybook/react';
import { Typography } from '@material-ui/core';
import External from '.';

storiesOf('Layouts|External', module).add('Default', () => (
  <External
    loggedIn={false}
    title="My Public View"
    companyName="Foo"
  >
    <Typography>Pass any child!</Typography>
  </External>
));

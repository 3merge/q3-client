import React from 'react';
import { storiesOf } from '@storybook/react';
import Typography from '@material-ui/core/Typography';
import HelperText from '.';

storiesOf('Components/HelperText', module).add(
  'Default',
  () => (
    <Typography>
      Another Element
      <HelperText text="lorem" />
    </Typography>
  ),
);

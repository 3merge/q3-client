import React from 'react';
import { storiesOf } from '@storybook/react';
import PasswordChange from '.';

storiesOf('Views|Password Change', module).add(
  'Default',
  () => <PasswordChange onSubmit={() => null} />,
);

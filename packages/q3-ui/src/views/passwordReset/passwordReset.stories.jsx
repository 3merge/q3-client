import React from 'react';
import { storiesOf } from '@storybook/react';
import PasswordReset from '.';

storiesOf('Views|Password Reset', module).add(
  'Default',
  () => <PasswordReset onSubmit={() => null} />,
);

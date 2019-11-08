import React from 'react';
import { storiesOf } from '@storybook/react';
import { loadReCaptcha } from 'react-recaptcha-google';
import MockApi from 'q3-axios-mock';
import PasswordReset from '.';

storiesOf('Views|Password reset', module).add(
  'Default',
  () => {
    loadReCaptcha();
    return (
      <MockApi>
        <PasswordReset />
      </MockApi>
    );
  },
);

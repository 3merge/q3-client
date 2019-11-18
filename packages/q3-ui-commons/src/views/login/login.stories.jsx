import React from 'react';
import { storiesOf } from '@storybook/react';
import { loadReCaptcha } from 'react-recaptcha-google';
import MockApi from 'q3-axios-mock';
import Login from '.';

storiesOf('Views|Login', module).add('Default', () => {
  loadReCaptcha();
  return (
    <MockApi>
      <Login />
    </MockApi>
  );
});

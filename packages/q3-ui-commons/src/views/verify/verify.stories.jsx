import React from 'react';
import { storiesOf } from '@storybook/react';
import { loadReCaptcha } from 'react-recaptcha-google';
import MockApi from 'q3-axios-mock';
import Verify from '.';

storiesOf('Views|Verify', module).add('Default', () => {
  loadReCaptcha();
  return (
    <MockApi>
      <Verify />
    </MockApi>
  );
});

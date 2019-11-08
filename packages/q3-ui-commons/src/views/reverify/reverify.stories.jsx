import React from 'react';
import { storiesOf } from '@storybook/react';
import { loadReCaptcha } from 'react-recaptcha-google';
import MockApi from 'q3-axios-mock';
import Reverify from '.';

storiesOf('Views|Reverify', module).add('Default', () => {
  loadReCaptcha();
  return (
    <MockApi>
      <Reverify />
    </MockApi>
  );
});

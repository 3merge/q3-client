import React from 'react';
import { storiesOf } from '@storybook/react';
import { loadReCaptcha } from 'react-recaptcha-google';
import MockApi from 'q3-ui-test-utils/lib/rest';
import {
  Login,
  PasswordChange,
  PasswordReset,
  Reverify,
  Verify,
} from '.';

export default {
  title: 'Q3 Forms|Presets',
};

const mockup = (m) => {
  m.onPost(/verify/).reply(204);
  m.onPost(/reverify/).reply(204);

  m.onPost(/password-reset/).reply(204, {
    message: 'If the email exists, you will get a message',
  });

  m.onPost(/authenticate/).reply(({ url, ...rest }) => {
    const { email, password } = JSON.parse(rest.data);

    return email === 'foo@bar.com' &&
      password === 'password'
      ? [204, { token: '', nonce: '' }]
      : [
          400,
          {
            errors: {
              email: 'Unknown account',
            },
          },
        ];
  });
};

export const LoginExample = () => (
  <MockApi define={mockup}>
    <Login />
  </MockApi>
);

export const PasswordChangeDefault = () => (
  <MockApi define={mockup}>
    <PasswordChange />
  </MockApi>
);

export const PasswordResetDefault = () => (
  <MockApi define={mockup}>
    <PasswordReset />
  </MockApi>
);

export const ReverifyDefault = () => (
  <MockApi define={mockup}>
    <Reverify />
  </MockApi>
);

export const VerifyDefault = () => (
  <MockApi define={mockup}>
    <Verify />
  </MockApi>
);

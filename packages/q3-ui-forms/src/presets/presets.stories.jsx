import React from 'react';

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
  m.onPost(/reverify/).reply(204);

  m.onPost(/verify/).reply((resp) => {
    const { id } = JSON.parse(resp.data);
    return [id === '123' ? 204 : 422];
  });

  m.onPost(/password-change/).reply((resp) => {
    const { previousPassword } = JSON.parse(resp.data);
    return [previousPassword === 'password' ? 200 : 422];
  });

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
    <Verify id="123" verificationCode="12345" />
  </MockApi>
);

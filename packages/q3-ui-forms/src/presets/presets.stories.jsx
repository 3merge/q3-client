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

const mockup = (m) => {
  m.onGet('/authenticate?email=foo@bar.com').reply(200);
  m.onGet('/authenticate?email=foo@baz.com').reply(400);
  m.onPost(/verify/).reply(204);
  m.onPost(/reverify/).reply(204);

  m.onPost(/password-reset/).reply(204, {
    message: 'If the email exists, you will get a message',
  });

  m.onPost(/authenticate/).reply(201, {
    token: 1,
    nonce: 1,
  });

  m.onGet(/authenticate/).reply(({ url }) =>
    url.includes('foo@bar')
      ? [204]
      : [
          400,
          {
            errors: {
              email: 'Unknown account',
            },
          },
        ],
  );
};

storiesOf('Forms|Presets', module)
  .add('Login', () => {
    loadReCaptcha();
    return (
      <MockApi define={mockup}>
        <Login />
      </MockApi>
    );
  })
  .add('Password change', () => {
    loadReCaptcha();
    return (
      <MockApi define={mockup}>
        <PasswordChange />
      </MockApi>
    );
  })
  .add('Password reset', () => {
    loadReCaptcha();
    return (
      <MockApi define={mockup}>
        <PasswordReset />
      </MockApi>
    );
  })
  .add('Reverify', () => {
    loadReCaptcha();
    return (
      <MockApi define={mockup}>
        <Reverify />
      </MockApi>
    );
  })
  .add('Verify', () => {
    loadReCaptcha();
    return (
      <MockApi define={mockup}>
        <Verify />
      </MockApi>
    );
  });

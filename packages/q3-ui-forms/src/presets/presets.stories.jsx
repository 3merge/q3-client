import React from 'react';
import Location from 'q3-ui-test-utils/lib/location';
import LocationDebugger from 'q3-ui-test-utils/lib/locationDebugger';
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

const acceptEmail = (resp) => {
  const { email } = JSON.parse(resp.data);
  return [email === 'foo@bar.com' ? 200 : 422];
};

const mockup = (m) => {
  m.onPost(/reverify/).reply(acceptEmail);
  m.onPost(/password-reset/).reply(acceptEmail);

  m.onPost(/verify/).reply((resp) => {
    const { id } = JSON.parse(resp.data);
    return [id === '123' ? 204 : 422];
  });

  m.onPost(/password-change/).reply((resp) => {
    const { previousPassword } = JSON.parse(resp.data);
    return [previousPassword === 'password' ? 200 : 422];
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

const wrapper = (Component) => (
  <MockApi define={mockup}>
    <Location initialPath="/test">
      <Component />
      <LocationDebugger />
    </Location>
  </MockApi>
);

export const LoginExample = wrapper(() => <Login />);

export const PasswordChangeDefault = wrapper(() => (
  <PasswordChange />
));

export const PasswordChangeViaToken = wrapper(() => (
  <PasswordChange passwordResetToken="123" debug />
));

export const PasswordResetDefault = wrapper(() => (
  <PasswordReset />
));

export const ReverifyDefault = wrapper(() => <Reverify />);

export const VerifyDefault = wrapper(() => (
  <Verify id="123" verificationCode="12345" />
));

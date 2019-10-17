import React from 'react';
import { storiesOf } from '@storybook/react';
import { ApplicationGate } from '.';
import MockAPI from './utils/mocker';

const defineMocks = (mock) => {
  mock.onGet('/profile').reply(401);
  mock.onPost('/password-reset').reply(204);
  mock.onGet(/authenticate/).reply((v) => {
    return v.url.includes('email=foo@bar')
      ? [204, {}]
      : [
          400,
          {
            errors: {
              email: {
                msg: 'Not a known email',
              },
            },
          },
        ];
  });
};

storiesOf('Presets|Application', module).add(
  'Public',
  () => (
    <MockAPI define={defineMocks}>
      <ApplicationGate
        name="3merge"
        logoImgSrc="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png"
        appIndex={() => null}
        appNav={() => null}
      />
    </MockAPI>
  ),
  {
    router: '/login',
  },
);

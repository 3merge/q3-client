import React from 'react';
import { storiesOf } from '@storybook/react';
import { merge } from 'lodash';
import { ThemeProvider } from '@material-ui/styles';
import { ApplicationGate } from '.';
import MockAPI from './mock';

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

const defineMocksAuth = (mock) => {
  mock.onGet('/profile').reply(200, {
    profile: {
      firstName: 'Mike',
      photo:
        'https://images.unsplash.com/photo-1456327102063-fb5054efe647?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=f05c14dd4db49f08a789e6449604c490',
      role: 'ADMIN',
    },
  });
};

const brandIt = (theme) =>
  merge(theme, {
    palette: {
      primary: {
        main: '#211111',
      },
      secondary: {
        main: '#151212',
      },
    },
  });

storiesOf('Presets|Application', module)
  .add(
    'Public',
    () => (
      <MockAPI define={defineMocks}>
        <ThemeProvider theme={brandIt}>
          <ApplicationGate
            name="3merge"
            logoImgSrc="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png"
            appIndex={() => null}
            appNav={() => null}
          />
        </ThemeProvider>
      </MockAPI>
    ),
    {
      router: '/login',
    },
  )
  .add(
    'Private',
    () => (
      <MockAPI define={defineMocksAuth}>
        <ThemeProvider theme={brandIt}>
          <ApplicationGate
            name="3merge"
            logoImgSrc="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png"
            appIndex={() => null}
            appNav={() => null}
            popoutMenuItems={[
              {
                // eslint-disable-next-line
              onClick: () => alert('Boom'),
                label: 'Heyo',
              },
            ]}
          />
        </ThemeProvider>
      </MockAPI>
    ),
    {
      router: '/',
    },
  )
  .add(
    'Private intercepted',
    () => (
      <MockAPI define={defineMocksAuth}>
        <ThemeProvider theme={brandIt}>
          <ApplicationGate
            name="3merge"
            logoImgSrc="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo1.png"
            appIndex={null}
            appNav={() => null}
            postAuthVerification={(args) => {
              if (args.role === 'ADMIN') {
                // eslint-disable-next-line
                alert('do something');
              }
            }}
          />
        </ThemeProvider>
      </MockAPI>
    ),
    {
      router: '/',
    },
  );

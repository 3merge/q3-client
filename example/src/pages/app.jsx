import React from 'react';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import { Router } from '@reach/router';
import Admin from 'q3-admin';
import { useTimezoneInterceptor } from 'q3-ui-rest';
import { Gatekeeper } from 'q3-admin/lib/containers';
import pages from '../views';
import logo from '../assets/logo.svg';

const redirectCheck = (profile) =>
  profile?.role === 'Regular' ? '/regular' : null;

export default () => {
  useTimezoneInterceptor('America/Los_Angeles');

  return (
    <Gatekeeper
      redirectPathOnPublic="/login"
      redirectCheck={redirectCheck}
    >
      <Router basepath="/app">
        <Admin
          path="*"
          logoSrc={logo}
          icons={{
            characters: AccessibilityIcon,
          }}
          profileItems={[]}
          AppProps={{
            directory: '/app/',
            redirectPathForUnauthorizedUsers: '/login',
            pages,
          }}
          NavProps={{
            logoSrc: logo,
            title: 'Navigation',
          }}
          SocketProps={{
            onDownload: ({ data }) => {
              if (
                data &&
                data.path.includes('characters.pdf')
              )
                window.open(data.url);
            },
          }}
        />
      </Router>
    </Gatekeeper>
  );
};

import React from 'react';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import { Router } from '@reach/router';
import Admin from 'q3-admin';
import { useTimezoneInterceptor } from 'q3-ui-rest';
import { Gatekeeper } from 'q3-admin/lib/containers';
import pages from '../views';

export default () => {
  useTimezoneInterceptor('America/Los_Angeles');

  return (
    <Gatekeeper redirectPathOnPublic="/login">
      <Router basepath="/app">
        <Admin
          path="*"
          logoSrc="https://image-placeholder.com/images/image-placeholder.png"
          icons={{
            characters: AccessibilityIcon,
          }}
          profileItems={[]}
          AppProps={{
            directory: '/app/',
            redirectPathForUnauthorizedUsers: '/login',
            pages,
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

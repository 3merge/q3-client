import React from 'react';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import { Router } from '@reach/router';
import Admin from 'q3-admin';
import { AuthContext } from 'q3-ui-permissions';
import { useTimezoneInterceptor } from 'q3-ui-rest';
import pages from '../views';

export default () => {
  const { state } = React.useContext(AuthContext);
  useTimezoneInterceptor('Europe/London');

  return state.init ? (
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
  ) : (
    'Thinking...'
  );
};

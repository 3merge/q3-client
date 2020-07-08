import React from 'react';
import { get } from 'lodash';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import { Router } from '@reach/router';
import Admin from 'q3-admin';
import { AuthContext } from 'q3-ui-permissions';
import views from '../views';

export default () => {
  const { state } = React.useContext(AuthContext);

  return state.init ? (
    <Router basepath="/app">
      <Admin
        path="*"
        reports="/app/reports"
        logs="/app/logs"
        profile="/app/profile"
        logoSrc="https://image-placeholder.com/images/image-placeholder.png"
        pages={views}
        icons={{
          characters: AccessibilityIcon,
        }}
      />
    </Router>
  ) : (
    'Thinking...'
  );
};

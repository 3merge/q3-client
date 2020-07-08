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
        logoSrc="https://image-placeholder.com/images/image-placeholder.png"
        socket="http://localhost:8080"
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

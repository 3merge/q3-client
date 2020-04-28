import React from 'react';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import { Router } from '@reach/router';
import { App, Main } from 'q3-admin/lib/components';
import {
  AuthContext,
  destroySession,
} from 'q3-ui-permissions';

import views from '../views';

const Profile = () => null;

export default () => {
  const { t } = useTranslation('labels');
  const { state } = React.useContext(AuthContext);

  return (
    <Router basepath="/app">
      <Main
        path="*"
        pages={views}
        ProfileBarProps={{
          profileImgSrc: get(state, 'profile.photo'),
          menuItems: [
            {
              onClick: destroySession,
              label: t('logout'),
            },
          ],
        }}
        render={() => (
          <Router>
            <App default pages={views} profile={Profile} />
          </Router>
        )}
      />
    </Router>
  );
};

import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthProvider, {
  authenticate,
} from 'q3-react-permissions';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  Login,
  PasswordReset,
  Reverify,
  Verify,
} from '../../views';
import { External } from '../../layouts';

const Access = ({ name, logoImgSrc }) => {
  const { t } = useTranslation();
  const links = [
    {
      to: '/login',
      label: t('labels:login'),
      render: () => <Login onSubmit={authenticate} />,
    },
    {
      to: '/reset-password',
      label: t('labels:passwordReset'),
      render: () => <PasswordReset onSubmit={() => null} />,
    },
    {
      to: '/verify',
      label: t('labels:verify'),
      render: () => <Verify onSubmit={() => null} />,
    },
    {
      to: '/reverify',
      label: t('labels:reverify'),
      render: () => <Reverify onSubmit={() => null} />,
    },
  ];

  return (
    <AuthProvider
      loading={CircularProgress}
      renderPrivate={() => null}
      renderPublic={() => (
        <External
          companyName={name}
          links={links}
          logo={logoImgSrc}
        >
          <Switch>
            {links.map((link) => (
              <Route
                exact
                key={link.to}
                path={link.to}
                component={link.render}
              />
            ))}
            <Redirect exact to="login" />
          </Switch>
        </External>
      )}
    />
  );
};

Access.propTypes = {
  name: PropTypes.string.isRequired,
  logoImgSrc: PropTypes.string.isRequired,
};

export default Access;

import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Login,
  PasswordReset,
  Reverify,
  Verify,
} from '../../views';
import { External } from '../../layouts';

const Access = ({
  name,
  loginService,
  passwordResetService,
  verifyService,
  reverifyService,
}) => {
  const { t } = useTranslation();
  const links = [];

  if (loginService) {
    links.push({
      to: '/login',
      label: t('labels:login'),
      render: () => <Login onSubmit={loginService} />,
    });
  }

  if (passwordResetService) {
    links.push({
      to: '/reset-password',
      label: t('labels:passwordReset'),
      render: () => (
        <PasswordReset onSubmit={passwordResetService} />
      ),
    });
  }

  if (verifyService) {
    links.push({
      to: '/verify',
      label: t('labels:verify'),
      render: () => <Verify onSubmit={verifyService} />,
    });
  }

  if (reverifyService) {
    links.push({
      to: '/reverify',
      label: t('labels:reverify'),
      render: () => <Reverify onSubmit={reverifyService} />,
    });
  }

  return (
    <External companyName={name} links={links}>
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
  );
};

Access.propTypes = {
  name: PropTypes.string.isRequired,
  loginService: PropTypes.func.isRequired,
  passwordResetService: PropTypes.func,
  verifyService: PropTypes.func,
  reverifyService: PropTypes.func,
};

Access.defaultProps = {
  passwordResetService: null,
  verifyService: null,
  reverifyService: null,
};

export default Access;

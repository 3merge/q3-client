import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import {
  I18nextProvider,
  useTranslation,
} from 'react-i18next';
import Providers, { Views, Layouts, i18 } from 'q3-ui';
import Authentication, {
  authenticate,
} from 'q3-ui-permissions';
import CircularProgress from '@material-ui/core/CircularProgress';

export * as Templates from './templates';

const { Login, PasswordReset, Reverify, Verify } = Views;
const { External } = Layouts;

const ApplicationGate = ({ name, logoImgSrc }) => {
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
    <Authentication
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

ApplicationGate.propTypes = {
  name: PropTypes.string.isRequired,
  logoImgSrc: PropTypes.string.isRequired,
};

const Wrapper = ({ themeOptions, ...rest }) => (
  <BrowserRouter>
    <Providers settings={themeOptions}>
      <I18nextProvider i18n={i18}>
        <ApplicationGate {...rest} />
      </I18nextProvider>
    </Providers>
  </BrowserRouter>
);

Wrapper.propTypes = {
  themeOptions: PropTypes.shape({
    primary: PropTypes.string,
    secondary: PropTypes.string,
  }).isRequired,
};

export default Wrapper;

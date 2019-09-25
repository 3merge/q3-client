import React from 'react';
import PropTypes from 'prop-types';
import { Router } from '@reach/router';
import {
  I18nextProvider,
  useTranslation,
} from 'react-i18next';
import Providers, { Components, Views, i18 } from 'q3-ui';
import Authentication, {
  Axios,
  authenticate,
} from 'q3-ui-permissions';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ThemeProvider } from '@material-ui/styles';
import * as Templates from './templates';

const { Login, PasswordReset, Reverify, Verify } = Views;
const { Public } = Templates;

const ApplicationGate = ({
  name,
  logoImgSrc,
  applicationIndex,
}) => {
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
      renderPrivate={applicationIndex}
      renderPublic={() => (
        <Public
          companyName={name}
          links={links}
          logo={logoImgSrc}
        >
          <Router>
            {links.map(({ render: Renderer, ...rest }) => (
              <Renderer key={rest.to} path={rest.to} />
            ))}
          </Router>
        </Public>
      )}
    />
  );
};

ApplicationGate.propTypes = {
  name: PropTypes.string.isRequired,
  logoImgSrc: PropTypes.string.isRequired,
};

const Wrapper = ({ theme, ...rest }) => (
  <Providers>
    <ThemeProvider theme={theme}>
      <I18nextProvider i18n={i18}>
        <ApplicationGate {...rest} />
      </I18nextProvider>
    </ThemeProvider>
  </Providers>
);

Wrapper.propTypes = {
  themeOptions: PropTypes.shape({
    primary: PropTypes.string,
    secondary: PropTypes.string,
  }).isRequired,
};

export default Wrapper;
export { Components, Templates, Axios };

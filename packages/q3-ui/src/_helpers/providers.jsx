import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import MomentUtils from '@date-io/moment';
import { I18nextProvider } from 'react-i18next';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import i18n from '../i18n';
import theme from '../mui';

const Providers = ({ children }) => (
  <I18nextProvider i18n={i18n}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css?family=Lato&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        {children}
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  </I18nextProvider>
);

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Providers;

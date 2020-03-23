import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import MomentUtils from '@date-io/moment';
import Locale from 'q3-ui-locale';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import theme from '../mui';

const Providers = ({ children }) => (
  <Locale>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        {children}
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  </Locale>
);

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Providers;

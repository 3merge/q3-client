import React from 'react';
import { merge } from 'lodash';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import MomentUtils from '@date-io/moment';
import Locale from 'q3-ui-locale';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import baseQ3Theme from '../mui';

const Providers = ({ children, theme }) => (
  <Locale>
    <ThemeProvider theme={merge(baseQ3Theme, theme)}>
      <CssBaseline />
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto&Source+Sans+Pro:400&display=swap"
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
  theme: PropTypes.shape({
    palette: PropTypes.object,
  }),
};

Providers.defaultProps = {
  theme: {},
};

export default Providers;

import React from 'react';
import { merge } from 'lodash';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import PropTypes from 'prop-types';
import Locale from 'q3-ui-locale';
import MomentAdapter from '@material-ui/pickers/adapter/moment';
import { LocalizationProvider } from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import baseQ3Theme from '../mui';

import 'moment/locale/fr';
import 'moment/locale/en-ca';
import 'swiper/css/swiper.css';

const Providers = ({ children, theme }) => (
  <Locale>
    <ThemeProvider theme={merge(baseQ3Theme, theme)}>
      <CssBaseline />
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:600&Source+Sans+Pro:400&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <LocalizationProvider
        dateLibInstance={moment}
        dateAdapter={MomentAdapter}
      >
        {children}
      </LocalizationProvider>
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

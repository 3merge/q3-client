import React from 'react';
import { merge } from 'lodash';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import Locale from 'q3-ui-locale';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Mode from '../Mode';
import baseQ3Theme from '../mui';

import 'moment/locale/fr';
import 'moment/locale/en-ca';
import 'swiper/swiper-bundle.css';

const Providers = ({ children, initialType, theme }) => (
  <Locale>
    <Mode initialType={initialType}>
      {(type) => (
        <ThemeProvider
          theme={merge(baseQ3Theme(type), theme)}
        >
          <CssBaseline />
          <Helmet>
            <link
              href="https://fonts.googleapis.com/css?family=Roboto:600&Source+Sans+Pro:400&display=swap"
              rel="stylesheet"
            />
          </Helmet>
          {children}
        </ThemeProvider>
      )}
    </Mode>
  </Locale>
);

Providers.propTypes = {
  children: PropTypes.node.isRequired,
  initialType: PropTypes.oneOf(['light', 'dark']),
  theme: PropTypes.shape({
    // eslint-disable-next-line
    palette: PropTypes.object,
  }),
};

Providers.defaultProps = {
  theme: {},
  initialType: 'light',
};

export default Providers;

import React from 'react';
import { merge } from 'lodash';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import Locale from 'q3-ui-locale';
import { ThemeProvider } from '@material-ui/core/styles';
import {
  CssBaseline,
  darken,
  lighten,
} from '@material-ui/core';
import Mode from '../Mode';
import baseQ3Theme from '../mui';

import 'moment/locale/fr';
import 'moment/locale/en-ca';

const Providers = ({
  children,
  initialType,
  enableToggle,
  color,
  theme,
  ...rest
}) => (
  <Mode
    enableToggle={enableToggle}
    initialType={initialType}
  >
    {(type) => (
      <ThemeProvider
        theme={merge(baseQ3Theme(type), theme, {
          palette: {
            primary: {
              main: darken(color, 0.9),
              light: lighten(color, 0.85),
              dark: darken(color, 0.95),
              contrastText: lighten(color, 1),
            },
            secondary: {
              main: color,
              light: lighten(color, 0.5),
              dark: darken(color, 0.5),
              contrastText: lighten(color, 1),
            },
          },
        })}
      >
        <CssBaseline />
        <Helmet>
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&Source+Sans+Pro:400&display=swap"
            rel="stylesheet"
          />
        </Helmet>
        <Locale {...rest}>{children}</Locale>
      </ThemeProvider>
    )}
  </Mode>
);

Providers.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  initialType: PropTypes.oneOf(['light', 'dark']),
  enableToggle: PropTypes.bool,
  theme: PropTypes.shape({
    // eslint-disable-next-line
    palette: PropTypes.object,
  }),
};

Providers.defaultProps = {
  theme: {},
  initialType: 'light',
  enableToggle: true,
  color: '#49EC1C',
};

export default Providers;

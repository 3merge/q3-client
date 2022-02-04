import React from 'react';
import { merge } from 'lodash';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import Locale from 'q3-ui-locale';
import { ThemeProvider } from '@material-ui/core/styles';
import {
  CssBaseline,
  CircularProgress,
  Box,
} from '@material-ui/core';
import Mode from '../Mode';
import baseQ3Theme from '../mui';

import 'moment/locale/fr';
import 'moment/locale/en-ca';

const Loading = () => (
  <Box
    position="fixed"
    top="50%"
    left="50%"
    style={{
      transform: 'translate(-50%,-50%)',
    }}
  >
    <CircularProgress />
  </Box>
);

const Providers = ({
  children,
  initialType,
  enableToggle,
  theme,
  ...rest
}) => (
  <Mode
    enableToggle={enableToggle}
    initialType={initialType}
  >
    {(type) => (
      <ThemeProvider
        theme={merge(baseQ3Theme(type), theme)}
      >
        <CssBaseline />
        <Helmet>
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&Source+Sans+Pro:400&display=swap"
            rel="stylesheet"
          />
        </Helmet>
        <Locale fallback={<Loading />} {...rest}>
          {children}
        </Locale>
      </ThemeProvider>
    )}
  </Mode>
);

Providers.propTypes = {
  children: PropTypes.node.isRequired,
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
};

export default Providers;

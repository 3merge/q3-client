import React from 'react';
import PropTypes from 'prop-types';
import {
  ThemeProvider,
  createTheme,
} from '@material-ui/core/styles';

const DarkMode = ({ children }) => (
  <ThemeProvider
    theme={createTheme({
      palette: {
        type: 'dark',
      },
    })}
  >
    {children}
  </ThemeProvider>
);

DarkMode.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DarkMode;

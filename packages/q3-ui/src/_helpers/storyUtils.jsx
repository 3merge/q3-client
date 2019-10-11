import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MomentUtils from '@date-io/moment';
import PropTypes from 'prop-types';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { I18nextProvider } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import i18n from '../i18n';
import theme from '../mui';

export default (story) => (
  <I18nextProvider i18n={i18n}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MuiPickersUtilsProvider utils={MomentUtils}>
        {story()}
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  </I18nextProvider>
);

export const Wrapper = ({ children }) => (
  <Container>
    <Box my={4}>{children}</Box>
  </Container>
);

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

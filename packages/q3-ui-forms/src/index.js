/* eslint-disable react/jsx-filename-extension,react/prop-types */
import './helpers/validation';
import React from 'react';
import MomentUtils from '@date-io/moment';
import { SnackbarProvider } from 'notistack';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment from 'moment';

export { default as useNotification } from './providers/notistack';

export * as Adapters from './adapters';
export * as Builders from './builders';
export * as helpers from './helpers';
export * as Context from './FormsContext';

export default ({ children, ...rest }) => (
  <SnackbarProvider
    preventDuplicate
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    {...rest}
  >
    <MuiPickersUtilsProvider utils={MomentUtils}>
      {children}
    </MuiPickersUtilsProvider>
  </SnackbarProvider>
);

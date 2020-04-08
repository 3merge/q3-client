import './helpers/validation';
import React from 'react';
import { SnackbarProvider } from 'notistack';

export { default as useNotification } from './providers/notistack';
export { default as useFormHandler } from './providers/formik';

// eslint-disable-next-line
export default ({ children, ...rest }) =>
  React.createElement(
    SnackbarProvider,
    {
      preventDuplicate: true,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right',
      },
      ...rest,
    },
    children,
  );

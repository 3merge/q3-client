import './helpers/validation';
import React from 'react';
import { SnackbarProvider } from 'notistack';

export { default as useNotification } from './providers/notistack';

export * as Adapters from './adapters';
export * as Builders from './builders';
export * as helpers from './helpers';

export * as Context from './FormsContext';

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

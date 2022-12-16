/* eslint-disable react/jsx-filename-extension,react/prop-types */
import './helpers/validation';
import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { SnackbarProvider, useSnackbar } from 'notistack';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export { default as useNotification } from './providers/notistack';

export * as Adapters from './adapters';
export * as Builders from './builders';
export * as helpers from './helpers';
export * as Context from './FormsContext';

const Node = React.forwardRef((props, ref) => {
  const { id, message, variant } = props;
  const { closeSnackbar } = useSnackbar(id);

  return (
    <div ref={ref}>
      <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              closeSnackbar(id);
            }}
          >
            <CloseIcon />
          </IconButton>
        }
        severity={variant}
      >
        {message}
      </Alert>
    </div>
  );
});

export default ({ children, ...rest }) => (
  <SnackbarProvider
    preventDuplicate
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    classes={{
      anchorOriginBottomRight: 'fix-min-width',
      containerRoot: 'snackbar-mobile-bump',
    }}
    Components={{
      default: Node,
      error: Node,
      info: Node,
      success: Node,
      warning: Node,
    }}
    {...rest}
  >
    {children}
  </SnackbarProvider>
);

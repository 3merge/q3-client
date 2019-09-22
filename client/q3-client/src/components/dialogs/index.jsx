import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import { Redirect } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';
import Appbar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import Toolbar from '@material-ui/core/Toolbar';
import { Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  desktopOffset: {
    marginLeft: 337,
  },
  margin: {
    marginBottom: theme.spacing(2),
  },
  saddle: {
    maxWidth: 550,
  },
}));

export const useOpenState = () => {
  const [state, setState] = React.useState();

  const open = React.useCallback((e) => {
    if (e && 'target' in e) {
      setState(e.target);
    }
  }, []);

  const close = React.useCallback(() => {
    setState(null);
  }, []);

  return {
    isOpen: Boolean(state),
    anchorEl: state,
    close,
    open,
  };
};

export const useChange = () => {
  const [value, setValue] = React.useState('');

  const onChange = React.useCallback(({ target }) => {
    setValue(target.value);
  }, []);

  return {
    value,
    setValue,
    onChange,
  };
};

export const Delete = ({ next, redirect }) => {
  const [shouldRedirect, setRedirect] = React.useState();
  const [hasError, setError] = React.useState(false);
  const { value, onChange, setValue } = useChange();
  const { isOpen, open, close } = useOpenState();
  const { t } = useTranslation();

  const submit = React.useCallback(() => {
    if (String('DELETE').localeCompare(value) !== 0) {
      setError(true);
      return;
    }

    next().finally(() => {
      if (redirect) {
        setRedirect(true);
      } else {
        close();
        setValue('');
      }
    });
  }, [value]);

  return shouldRedirect ? (
    <Redirect to={redirect} />
  ) : (
    <>
      <Tooltip title={t('labels:delete')}>
        <IconButton type="button" onClick={open}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={isOpen} onClose={close}>
        <DialogTitle>{t('titles:delete')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('descriptions:delete')}
          </DialogContentText>
          <TextField
            value={value}
            onChange={onChange}
            label={t('descriptions:deleteConfirmation')}
            margin="dense"
            fullWidth
            autoFocus
            name="confirm"
            type="text"
            error={hasError}
          />
          <DialogActions>
            <Button type="button" onClick={close}>
              {t('labels:nevermind')}
            </Button>
            <Button type="button" onClick={submit}>
              {t('labels:continue')}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

Delete.propTypes = {
  next: PropTypes.func.isRequired,
  redirect: PropTypes.string,
};

Delete.defaultProps = {
  redirect: null,
};

export const Create = ({ render }) => {
  const { isOpen, open, close } = useOpenState();
  const { desktopOffset, saddle } = useStyles();
  const { t } = useTranslation();

  return render ? (
    <>
      <Tooltip title={t('labels:add')}>
        <Fab color="secondary" onClick={open}>
          <Add />
        </Fab>
      </Tooltip>
      <Dialog
        fullScreen
        onClose={close}
        open={isOpen}
        className={desktopOffset}
      >
        <Appbar
          elevation={0}
          color="inherit"
          position="relative"
        >
          <Toolbar>
            <IconButton
              onClick={close}
              aria-label={t('titles:back')}
            >
              <KeyboardBackspace />
            </IconButton>
          </Toolbar>
        </Appbar>
        <DialogContent className={saddle}>
          {render(close)}
        </DialogContent>
      </Dialog>
    </>
  ) : null;
};

export const createDialogProps = {
  render: PropTypes.func.isRequired,
};

Create.propTypes = createDialogProps;

export const Capture = ({
  children,
  onSubmit,
  icon: Icon,
  title,
  fab,
  ...rest
}) => {
  const { isOpen, open, close } = useOpenState();
  const { t } = useTranslation();

  return (
    <Formik
      {...rest}
      enableReinitialize
      onSubmit={(...args) => onSubmit(...args).then(close)}
      validateOnChange={false}
      render={({ submitForm, isSubmitting }) => (
        <Form>
          <Tooltip title={t('labels:open')}>
            {fab ? (
              <Fab
                onClick={open}
                color="secondary"
                aria-label={t('labels:openEditor')}
              >
                <Icon />
              </Fab>
            ) : (
              <IconButton
                onClick={open}
                aria-label={t('labels:openEditor')}
              >
                <Icon />
              </IconButton>
            )}
          </Tooltip>
          <Dialog
            fullWidth
            maxWidth="sm"
            open={isOpen}
            onClose={close}
          >
            {isSubmitting && <LinearProgress />}
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
              {children}
              <DialogActions>
                <Button type="button" onClick={close}>
                  {t('labels:nevermind')}
                </Button>
                <Button type="button" onClick={submitForm}>
                  {t('labels:save')}
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
        </Form>
      )}
    />
  );
};

Capture.propTypes = {
  children: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  fab: PropTypes.bool.isRequired,
};

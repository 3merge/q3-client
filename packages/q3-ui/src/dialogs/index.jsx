import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import { navigate } from '@reach/router';
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
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import { Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  desktopOffset: {
    marginLeft: 337,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  margin: {
    marginBottom: theme.spacing(2),
  },
  saddle: {
    maxWidth: 750,
    paddingTop: theme.spacing(8),
    paddingLeft: theme.spacing(6),
  },
  backBtn: {
    position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(1),
  },
  floatOnDesktop: {
    position: 'fixed',
    right: theme.spacing(2),
    bottom: theme.spacing(2),
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
  const [hasError, setError] = React.useState(false);
  const { value, onChange, setValue } = useChange();
  const { isOpen, open, close } = useOpenState();
  const { t } = useTranslation();

  const submit = React.useCallback(() => {
    if (String('DELETE').localeCompare(value) !== 0) {
      setError(true);
      return;
    }

    next()
      .then(() => {
        close();
        setValue('');

        if (redirect) {
          navigate(redirect);
        }
      })
      .catch(() => {
        // noop
      });
  }, [value]);

  return (
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
  const {
    desktopOffset,
    floatOnDesktop,
    saddle,
    backBtn,
  } = useStyles();
  const { t } = useTranslation();

  return render ? (
    <>
      <Hidden mdUp>
        <IconButton
          onClick={open}
          aria-label={t('labels:add')}
        >
          <Add />
        </IconButton>
      </Hidden>
      <Hidden smDown>
        <Tooltip title={t('labels:add')}>
          <Fab
            color="secondary"
            className={floatOnDesktop}
            onClick={open}
          >
            <Add />
          </Fab>
        </Tooltip>
      </Hidden>
      <Dialog
        fullScreen
        onClose={close}
        open={isOpen}
        className={desktopOffset}
      >
        <IconButton
          onClick={close}
          className={backBtn}
          aria-label={t('titles:back')}
        >
          <KeyboardBackspace />
        </IconButton>
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
  asButton,
  label,
  ...rest
}) => {
  const { isOpen, open, close } = useOpenState();
  const { t } = useTranslation();
  const openLabel = t(`labels:${label}`);

  const renderTrigger = () => {
    if (fab)
      return (
        <Tooltip title={openLabel}>
          <Fab
            onClick={open}
            color="secondary"
            aria-label={openLabel}
          >
            <Icon />
          </Fab>
        </Tooltip>
      );

    if (asButton)
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={open}
        >
          {openLabel}
          <Icon />
        </Button>
      );

    return (
      <Tooltip title={openLabel}>
        <IconButton onClick={open} aria-label={openLabel}>
          <Icon />
        </IconButton>
      </Tooltip>
    );
  };

  return (
    <>
      {renderTrigger()}
      <Dialog
        fullWidth
        maxWidth="sm"
        open={isOpen}
        onClose={close}
      >
        <Formik
          {...rest}
          enableReinitialize
          onSubmit={(...args) =>
            onSubmit(...args).then(close)
          }
          validateOnChange={false}
          render={({ submitForm, isSubmitting }) => (
            <Form>
              {isSubmitting && <LinearProgress />}
              <DialogTitle>{title}</DialogTitle>
              <DialogContent>
                {children}
                <DialogActions>
                  <Button type="button" onClick={close}>
                    {t('labels:nevermind')}
                  </Button>
                  <Button
                    type="button"
                    onClick={submitForm}
                  >
                    {t('labels:save')}
                  </Button>
                </DialogActions>
              </DialogContent>
            </Form>
          )}
        />
      </Dialog>
    </>
  );
};

Capture.propTypes = {
  children: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  fab: PropTypes.bool.isRequired,
  label: PropTypes.string,
};

Capture.defaultProps = {
  label: 'openEditor',
};

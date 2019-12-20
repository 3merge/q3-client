/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Dialog from 'q3-ui-dialog';
import Typography from '@material-ui/core/Typography';
import { useAuth } from 'q3-ui-permissions';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Hidden from '@material-ui/core/Hidden';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import { makeStyles } from '@material-ui/core/styles';
import Context from './state';

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

export const CreateDialog = ({ children }) => {
  const {
    desktopOffset,
    floatOnDesktop,
    backBtn,
    saddle,
  } = useStyles();
  const { t } = useTranslation();

  return (
    <Dialog
      fullScreen
      className={desktopOffset}
      contentClassName={saddle}
      renderTrigger={(open) => (
        <>
          <Hidden mdUp>
            <IconButton
              onClick={open}
              aria-label={t('labels:add')}
            >
              <AddIcon />
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
        </>
      )}
      renderContent={(close) => (
        <>
          <IconButton
            onClick={close}
            className={backBtn}
            aria-label={t('titles:back')}
          >
            <KeyboardBackspace />
          </IconButton>
          {children(close)}
        </>
      )}
    />
  );
};

CreateDialog.propTypes = {
  children: PropTypes.func.isRequired,
};

const Add = ({ title, children }) => {
  const { collectionName, post } = React.useContext(
    Context,
  );

  const { Hide } = useAuth(collectionName);
  const { t } = useTranslation('titles');

  return (
    <Hide op="Create">
      {children ? (
        <CreateDialog>
          {(done) => (
            <>
              <Typography variant="h2">
                {t(title)}
              </Typography>
              {React.cloneElement(children, {
                isNew: true,
                collectionName,
                onSubmit: (...args) =>
                  post(...args).then(done),
              })}
            </>
          )}
        </CreateDialog>
      ) : null}
    </Hide>
  );
};

Add.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Add;

/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Dialog from 'q3-ui-dialog';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useAuth } from 'q3-ui-permissions';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Hidden from '@material-ui/core/Hidden';
import Close from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import Context from './state';

const useStyles = makeStyles((theme) => ({
  desktopOffset: {
    marginLeft: 345,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  margin: {
    marginBottom: theme.spacing(2),
  },
  saddle: {
    paddingRight: '35%',
    paddingTop: theme.spacing(8),
    paddingLeft: theme.spacing(6),
    [theme.breakpoints.down('md')]: {
      paddingRight: theme.spacing(3),
      paddingLeft: theme.spacing(3),
    },
  },
  backBtn: {
    position: 'absolute',
    top: theme.spacing(1),
    left: theme.spacing(1),
  },
  floatOnDesktop: {
    position: 'fixed',
    left: 305,
    bottom: theme.spacing(1),
    width: 75,
    height: 75,
    boxShadow: theme.shadows[20],
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
                elevation={15}
              >
                <AddIcon />
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
            <Close />
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

const Add = ({ title, children, onComplete }) => {
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
            <Box py={4}>
              <Typography variant="h2">
                {t(title)}
              </Typography>
              {React.cloneElement(children, {
                isNew: true,
                collectionName,
                onSubmit: (...args) =>
                  post(...args)
                    .then((r) => {
                      if (onComplete) onComplete(r);
                      return r;
                    })
                    .then(done),
              })}
            </Box>
          )}
        </CreateDialog>
      ) : null}
    </Hide>
  );
};

Add.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onComplete: PropTypes.func,
};

Add.defaultProps = {
  onComplete: null,
};

export default Add;

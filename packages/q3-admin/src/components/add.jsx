/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useAuth } from 'q3-ui-permissions';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import FullScreen from './fullScreen';
import Context from './state';

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: theme.spacing(2),
  },

  floatOnDesktop: {
    position: 'fixed',
    left: 298,
    bottom: theme.spacing(2),
    width: 75,
    height: 75,
    boxShadow: theme.shadows[20],
  },
}));

export const CreateDialog = (props) => {
  const { floatOnDesktop } = useStyles();
  const { t } = useTranslation();

  return (
    <FullScreen
      {...props}
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

  return (
    <Hide op="Create">
      {children ? (
        <CreateDialog title={title}>
          {(done) =>
            React.cloneElement(children, {
              isNew: true,
              collectionName,
              onSubmit: (...args) =>
                post(...args)
                  .then((r) => {
                    if (onComplete) onComplete(r);
                    return r;
                  })
                  .then(done),
            })
          }
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

/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Dialog from 'q3-ui-dialog';
import useStyles from './useStyle';

const CreateDialog = ({ children, ...props }) => {
  const { floatOnDesktop } = useStyles();
  const { t } = useTranslation();

  return (
    <Dialog
      {...props}
      variant="drawer"
      renderContent={children}
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
            <Fab
              aria-label={t('labels:add')}
              color="secondary"
              className={floatOnDesktop}
              id="app-add-dialog"
              onClick={open}
              elevation={15}
            >
              <AddIcon />
            </Fab>
          </Hidden>
        </>
      )}
    />
  );
};

CreateDialog.propTypes = {
  children: PropTypes.func.isRequired,
};

export default CreateDialog;

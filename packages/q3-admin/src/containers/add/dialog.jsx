/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Hidden from '@material-ui/core/Hidden';
import FullScreen from '../../components/fullScreen';
import useStyles from './useStyle';

const CreateDialog = (props) => {
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

export default CreateDialog;

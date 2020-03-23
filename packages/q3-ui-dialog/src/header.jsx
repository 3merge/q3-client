import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from './useStyle';

const DialogHeader = ({ title, onClose }) => {
  const { t } = useTranslation();
  const { toolbar } = useStyles();

  return (
    <AppBar color="inherit" elevation={3} position="static">
      <Toolbar className={toolbar}>
        {title && (
          <Typography
            color="inherit"
            component="h3"
            variant="h4"
          >
            {t(`titles:${title}`)}
          </Typography>
        )}
        <IconButton
          onClick={onClose}
          aria-label={t('labels:close')}
        >
          <CloseIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

DialogHeader.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};

DialogHeader.defaultProps = {
  title: null,
};

export default DialogHeader;

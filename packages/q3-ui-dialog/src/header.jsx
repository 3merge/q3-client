import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'q3-ui-locale';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from './useStyle';

const DialogHeader = ({ children, title, onClose }) => {
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
            {typeof title === 'string'
              ? t(`titles:${title}`)
              : title}
          </Typography>
        )}
        <Box display="flex" alignItems="center">
          {children}
          <IconButton
            onClick={onClose}
            aria-label={t('labels:close')}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

DialogHeader.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};

DialogHeader.defaultProps = {
  children: null,
  title: null,
};

export default DialogHeader;

import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  IconButton,
  Typography,
  Tooltip,
} from '@material-ui/core';
import LaunchIcon from '@material-ui/icons/Launch';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'q3-ui-locale';
import { ArticleAsideContext } from '../ArticleAside/ArticleAside';

const ArticleAsideHeader = ({ onOpen, title }) => {
  const { close } = React.useContext(ArticleAsideContext);
  const { t } = useTranslation('titles');

  return (
    <Box
      alignItems="center"
      component="header"
      display="flex"
      my={1}
      justifyContent="flex-end"
      position="relative"
      zIndex={2}
    >
      <Box flex={1}>
        <Typography variant="h5" component="h2">
          {t(title)}
        </Typography>
      </Box>
      <Tooltip title={t('labels:expand')}>
        <IconButton color="inherit" onClick={onOpen}>
          <LaunchIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={t('labels:close')}>
        <IconButton color="inherit" onClick={close}>
          <CloseIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

ArticleAsideHeader.defaultProps = {};

ArticleAsideHeader.propTypes = {
  onOpen: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default ArticleAsideHeader;

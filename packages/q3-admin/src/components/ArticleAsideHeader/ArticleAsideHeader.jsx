import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  IconButton,
  Tooltip,
} from '@material-ui/core';
import LaunchIcon from '@material-ui/icons/Launch';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'q3-ui-locale';
import { ArticleAsideContext } from '../ArticleAside/ArticleAside';
import WidgetTitle from '../WidgetTitle';
import useStyle from './styles';

const ArticleAsideHeader = ({ onOpen, title }) => {
  const { close } = React.useContext(ArticleAsideContext);
  const { t } = useTranslation('titles');
  const cls = useStyle();

  return (
    <Box
      className={cls.root}
      alignItems="center"
      component="header"
      display="flex"
      my={1}
      justifyContent="flex-end"
      position="relative"
      zIndex={2}
    >
      <Box flex={1}>
        <WidgetTitle text={title} />
      </Box>
      {onOpen && (
        <Tooltip title={t('labels:expand')}>
          <IconButton
            color="inherit"
            onClick={(e) => {
              close();
              onOpen(e);
            }}
          >
            <LaunchIcon />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title={t('labels:close')}>
        <IconButton color="inherit" onClick={close}>
          <CloseIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

ArticleAsideHeader.defaultProps = {
  onOpen: null,
};

ArticleAsideHeader.propTypes = {
  onOpen: PropTypes.func,
  title: PropTypes.string.isRequired,
};

export default ArticleAsideHeader;

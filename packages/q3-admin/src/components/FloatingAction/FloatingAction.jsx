import React from 'react';
import PropTypes from 'prop-types';
import { isFunction } from 'lodash';
import { useLocation } from '@reach/router';
import { Fab, Box, Tooltip } from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';
import { useTranslation } from 'q3-ui-locale';
import useStyle from './styles';

const FloatingAction = ({
  checkPage,
  icon: Icon,
  label,
  onClick,
}) => {
  const { pathname } = useLocation();
  const { t } = useTranslation('labels');
  const cls = useStyle();

  return label &&
    onClick &&
    (!isFunction(checkPage) || checkPage(pathname)) ? (
    <Box className={cls.root}>
      <Tooltip title={t(label)}>
        <Fab color="secondary" onClick={onClick}>
          <Icon />
        </Fab>
      </Tooltip>
    </Box>
  ) : null;
};

FloatingAction.propTypes = {
  checkPage: PropTypes.func,
  icon: PropTypes.element,
  label: PropTypes.string,
  onClick: PropTypes.func,
};

FloatingAction.defaultProps = {
  checkPage: null,
  icon: AppsIcon,
  label: undefined,
  onClick: null,
};

export default FloatingAction;

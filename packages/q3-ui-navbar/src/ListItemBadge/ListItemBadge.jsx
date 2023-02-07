import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { isNumber } from 'lodash';
import useStyle from './styles';

const ListItemBadge = ({ badge }) => {
  const cls = useStyle();

  return badge && isNumber(badge) ? (
    <Box className={cls.badge}>{String(badge)}</Box>
  ) : null;
};

ListItemBadge.defaultProps = {
  badge: 0,
};

ListItemBadge.propTypes = {
  badge: PropTypes.number,
};

export default ListItemBadge;

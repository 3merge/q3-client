import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import ListItemArrow from '../ListItemArrow';
import ListItemBadge from '../ListItemBadge';

const ListItemSecondaryActionPosition = ({
  arrow,
  state,
  badge,
}) => (
  <Box
    display="flex"
    justifyContent="flex-end"
    alignItems="center"
  >
    <ListItemBadge badge={badge} />
    <ListItemArrow arrow={arrow} state={state} />
  </Box>
);

ListItemSecondaryActionPosition.defaultProps = {
  arrow: false,
  badge: 0,
  state: false,
};

ListItemSecondaryActionPosition.propTypes = {
  arrow: PropTypes.bool,
  badge: PropTypes.number,
  state: PropTypes.bool,
};

export default ListItemSecondaryActionPosition;

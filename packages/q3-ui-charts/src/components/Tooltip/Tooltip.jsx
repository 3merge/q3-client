import React from 'react';
import PropTypes from 'prop-types';
import { array } from 'q3-ui-helpers';
import { Box, Paper, Typography } from '@material-ui/core';
import TooltipList from '../TooltipList';

const Tooltip = ({ active, payload, label }) =>
  active && label && array.hasLength(payload) ? (
    <Paper elevation={5}>
      <Box p={1}>
        <Typography variant="overline">{label}</Typography>
        <TooltipList data={payload} />
      </Box>
    </Paper>
  ) : null;

Tooltip.defaultProps = {
  active: false,
  label: undefined,
  payload: [],
};

Tooltip.propTypes = {
  active: PropTypes.bool,
  label: PropTypes.string,
  payload: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.String,
      payload: PropTypes.shape({}),
    }),
  ),
};

export default Tooltip;

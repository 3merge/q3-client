import React from 'react';
import PropTypes from 'prop-types';
import { Box, Paper, Typography } from '@material-ui/core';

const Tooltip = ({ active, payload, label }) => {
  if (active && label && Array.isArray(payload)) {
    return (
      <Paper elevation={5}>
        <Box p={1}>
          <Typography variant="overline">
            {label}
          </Typography>
          <Box
            component="ul"
            margin={0}
            padding={0}
            style={{
              listStyle: 'none',
            }}
          >
            {payload.map((item) => (
              <Typography
                component="li"
                key={item.name}
                style={{ margin: 0, fontSize: '0.933rem' }}
              >
                <u>{item.name}</u>:{' '}
                {item.payload[item.name]}
              </Typography>
            ))}
          </Box>
        </Box>
      </Paper>
    );
  }

  return null;
};

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

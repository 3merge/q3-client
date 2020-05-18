import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import useColor from '../useColor';

const Dot = ({ color, label }) => {
  const backgroundColor = useColor(color);

  return (
    <Box
      alignItems="center"
      color="primary"
      component="span"
      display="flex"
      position="relative"
    >
      <Box
        style={{ backgroundColor }}
        borderRadius={500}
        component="span"
        display="block"
        height={10}
        width={10}
      />
      <Box ml={0.25} component="small">
        {label}
      </Box>
    </Box>
  );
};

Dot.defaultProps = {};

Dot.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Dot;

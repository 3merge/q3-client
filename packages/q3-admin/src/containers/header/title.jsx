import React from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

const Title = ({ title, subtitle }) => (
  <Box
    display="flex"
    alignItems="flex-start"
    flexDirection="column"
    justifyContent="center"
  >
    <Box>{title}</Box>
    {subtitle && (
      <Box fontSize={16} display="block" component="small">
        {subtitle}
      </Box>
    )}
  </Box>
);

Title.propTypes = {
  /**
   * Renders a custom title.
   */
  title: PropTypes.string.isRequired,

  /**
   * Renders subtext below the title.
   */
  subtitle: PropTypes.string,
};

Title.defaultProps = {
  subtitle: '',
};

export default Title;

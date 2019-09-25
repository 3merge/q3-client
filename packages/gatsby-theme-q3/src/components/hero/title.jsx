import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export const BannerTitle = ({ title }) => (
  <Box mt={1} mb={2}>
    <Typography variant="h1">
      {typeof title === 'function' ? title() : title}
    </Typography>
  </Box>
);

BannerTitle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default BannerTitle;

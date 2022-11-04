import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const Title = ({ children, ...props }) => (
  <Typography
    component="h1"
    id="page-title"
    variant="h3"
    {...props}
  >
    {children}
  </Typography>
);

Title.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Title;

import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const Feature = ({
  title,
  description,
  icon: Icon,
  label,
}) => (
  <>
    <Typography
      component="h3"
      variant="overline"
      color="primary"
    >
      {label}
    </Typography>
    <Typography variant="h3" color="primary" gutterBottom>
      {Icon && (
        <Box display="inline-block" mr={1}>
          <Icon />
        </Box>
      )}
      {title}
    </Typography>
    <Typography style={{ fontSize: '0.911rem' }}>
      {description}
    </Typography>
  </>
);

Feature.defaultProps = {
  icon: null,
};

Feature.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.node,
};

export default Feature;

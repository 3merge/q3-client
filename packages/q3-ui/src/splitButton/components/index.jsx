import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const Label = ({ label, description }) => (
  <>
    <Typography variant="overline">{label}</Typography>
    <Typography component="small">{description}</Typography>
  </>
);

Label.propTypes = {
  /**
   * Populates the overline typography.
   */
  label: PropTypes.string.isRequired,

  /**
   * Populates the small print.
   */
  description: PropTypes.string.isRequired,
};

export default Label;

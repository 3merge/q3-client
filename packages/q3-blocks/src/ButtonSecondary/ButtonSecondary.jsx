import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const ButtonSecondary = ({ children, ...rest }) => (
  <Button
    fullWidth
    size="small"
    variant="outlined"
    color="secondary"
    {...rest}
  >
    {children}
  </Button>
);

ButtonSecondary.propTypes = {
  children: PropTypes.string.isRequired,
};

export default ButtonSecondary;

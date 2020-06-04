import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import Button from '@material-ui/core/Button';

const ButtonPrimary = ({ children, to, ...rest }) => (
  <Button
    size="large"
    variant="contained"
    color="secondary"
    component={to ? Link : undefined}
    {...rest}
  >
    {children}
  </Button>
);

ButtonPrimary.defaultProps = {
  to: '',
};

ButtonPrimary.propTypes = {
  children: PropTypes.string.isRequired,
  to: PropTypes.string,
};

export default ButtonPrimary;

import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from '@material-ui/core';
import { isFunction } from 'lodash';

const NavbarCallToAction = ({ icon, label, onClick }) =>
  label && isFunction(onClick) ? (
    <Box px={1.5} my={2}>
      <Button
        color="secondary"
        onClick={onClick}
        startIcon={icon}
        fullWidth
        size="large"
        variant="contained"
      >
        {label}
      </Button>
    </Box>
  ) : null;

NavbarCallToAction.defaultProps = {
  icon: null,
};

NavbarCallToAction.propTypes = {
  icon: PropTypes.element,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default NavbarCallToAction;

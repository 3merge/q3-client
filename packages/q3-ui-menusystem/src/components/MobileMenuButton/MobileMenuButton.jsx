import React from 'react';
import PropTypes from 'prop-types';

const MobileMenuButton = ({ onClick }) => (
  /* eslint-disable-next-line */
  <span
    aria-label="hidden-menu"
    id="app-menu"
    onClick={onClick}
    role="button"
    style={{
      display: 'none',
    }}
  />
);

MobileMenuButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default MobileMenuButton;

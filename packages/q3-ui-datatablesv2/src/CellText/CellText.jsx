import React from 'react';
import PropTypes from 'prop-types';

const CellText = ({ color, children }) => (
  <span style={{ color }}>{children}</span>
);

CellText.defaultProps = {
  children: '--',
  color: 'inherit',
};

CellText.propTypes = {
  children: PropTypes.string,
  color: PropTypes.string,
};

export default CellText;

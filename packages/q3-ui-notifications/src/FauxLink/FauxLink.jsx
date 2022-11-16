import React from 'react';
import PropTypes from 'prop-types';
import useStyle from './styles';

const FauxLink = ({ children }) => (
  <span className={useStyle().link}>
    <span>{children}</span>
  </span>
);

FauxLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
};

export default FauxLink;

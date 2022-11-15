import React from 'react';
import PropTypes from 'prop-types';
import useStyle from './styles';

const FauxLink = ({ children }) => (
  <span className={useStyle().link}>{children}</span>
);

FauxLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
  ]).isRequired,
};

export default FauxLink;

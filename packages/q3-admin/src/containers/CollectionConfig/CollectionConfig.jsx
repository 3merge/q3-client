import React from 'react';
import PropTypes from 'prop-types';
import { Options } from '../state';

const CollectionConfig = ({ children, options }) => (
  <Options.Provider value={options}>
    {children}
  </Options.Provider>
);

CollectionConfig.propTypes = {
  options: PropTypes.shape({
    enable: PropTypes.bool,
  }),
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.array,
  ]).isRequired,
};

CollectionConfig.defaultProps = {
  options: {
    all: true,
  },
};

export default CollectionConfig;

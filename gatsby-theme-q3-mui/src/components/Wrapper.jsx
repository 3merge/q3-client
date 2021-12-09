import React from 'react';
import Provider from 'q3-ui';
import PropTypes from 'prop-types';

const Wrapper = ({ children, ...rest }) => (
  <Provider {...rest}>{children}</Provider>
);

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  // eslint-disable-next-line
  theme: PropTypes.object.isRequired,
};

export default Wrapper;

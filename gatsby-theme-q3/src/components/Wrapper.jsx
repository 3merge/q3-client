/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import AuthProvider from 'q3-ui-permissions';

const Wrapper = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Wrapper;

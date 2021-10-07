import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from 'q3-admin/lib/components';

const AdminLoader = ({ children }) => (
  <>
    <Loader />
    {children}
  </>
);

AdminLoader.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLoader;

import React from 'react';
import PropTypes from 'prop-types';
import { Public } from 'q3-admin/lib/components';
import AdminPublicGateway from './AdminPublicGateway';
import useSiteMetaData from './useSiteMetaData';

const PublicTemplate = ({ children, ...rest }) => {
  const { brand, logo } = useSiteMetaData();

  return (
    <AdminPublicGateway {...rest}>
      <Public companyName={brand} logo={logo}>
        {children}
      </Public>
    </AdminPublicGateway>
  );
};

PublicTemplate.defaultProps = {
  children: null,
};

PublicTemplate.propTypes = {
  children: PropTypes.node,
};

export default PublicTemplate;

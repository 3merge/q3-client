import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import Box from '@material-ui/core/Box';
import LoginPage from 'q3-ui/lib/loginPage';

const PublicView = ({ companyName, logo, children }) => (
  <LoginPage>
    <Box width="100%">
      <Box mb={1} component="header">
        {/** This is for non-logged in users afterall... */}
        <Link
          to="/login"
          style={{
            display: 'inline-block',
            maxHeight: 65,
            marginBottom: '.5rem',
            width: 250,
          }}
        >
          <img
            src={logo}
            alt={companyName}
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
            }}
          />
        </Link>
      </Box>
      {children}
    </Box>
  </LoginPage>
);

PublicView.propTypes = {
  companyName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  logo: PropTypes.string.isRequired,
};

export default PublicView;

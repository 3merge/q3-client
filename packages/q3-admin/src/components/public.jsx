import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from '@reach/router';
import Box from '@material-ui/core/Box';
import LoginPage from 'q3-ui/lib/loginPage';

const PublicView = ({
  companyName,
  loggedIn,
  logo,
  children,
}) => {
  if (loggedIn) return <Redirect to="/" />;

  return (
    <LoginPage>
      <Box width="100%">
        <Box component="header">
          <img
            src={logo}
            alt={companyName}
            style={{
              maxHeight: 65,
              marginBottom: '.5rem',
            }}
          />
        </Box>
        {children}
      </Box>
    </LoginPage>
  );
};

PublicView.propTypes = {
  companyName: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  logo: PropTypes.string.isRequired,
};

export default PublicView;

import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from '@reach/router';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export default function PublicView({
  companyName,
  loggedIn,
  logo,
  children,
}) {
  if (loggedIn) return <Redirect to="/" />;

  return (
    <Box p={2} component="main">
      <Container maxWidth="sm">
        <Box textAlign="center" component="header" m={4}>
          <img
            src={logo}
            alt={companyName}
            style={{ maxHeight: 35, marginBottom: '.5rem' }}
          />
          <Typography variant="h1">
            {companyName}
          </Typography>
        </Box>
        <Box>{children}</Box>
      </Container>
    </Box>
  );
}

PublicView.propTypes = {
  companyName: PropTypes.string,
  children: PropTypes.node.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  logo: PropTypes.string,
};

PublicView.defaultProps = {
  companyName: '3merge',
  logo: null,
};

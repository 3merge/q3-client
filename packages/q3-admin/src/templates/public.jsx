import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link as ReactLink } from '@reach/router';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

export default function PublicView({
  children,
  links,
  companyName,
  loggedIn,
  logo,
}) {
  if (loggedIn) return <Redirect to="/" />;

  return (
    <Box p={2} component="main">
      <Container maxWidth="sm">
        <Box textAlign="center" component="header" m={4}>
          <img
            src={logo}
            alt={companyName}
            style={{ maxHeight: 35 }}
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
  links: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
};

PublicView.defaultProps = {
  companyName: '3merge',
  links: [],
};

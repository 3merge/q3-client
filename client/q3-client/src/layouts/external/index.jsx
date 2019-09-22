import React from 'react';
import PropTypes from 'prop-types';
import {
  Redirect,
  NavLink as ReactLink,
} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default function PublicView({
  children,
  links,
  companyName,
  loggedIn,
}) {
  if (loggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Box p={2} component="main">
      <Container maxWidth="xs">
        <Box textAlign="center" component="header" m={4}>
          <Typography variant="h1" color="primary">
            {companyName}
          </Typography>
        </Box>
        <Paper elevation={0}>{children}</Paper>
        {links && (
          <Box textAlign="center">
            <Grid container justify="center">
              {links.map(({ label, to }) => (
                <Grid item key={to}>
                  <Button
                    component={ReactLink}
                    activeClassName="Mui-selected"
                    to={to}
                    color="primary"
                    size="small"
                  >
                    {label}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
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

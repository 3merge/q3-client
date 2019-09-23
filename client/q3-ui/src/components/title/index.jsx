import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '../breadcrumbs';

const Title = ({ title }) => (
  <Container component="header">
    <Box py={4}>
      <Breadcrumbs />
      <Typography variant="h1">{title}</Typography>
    </Box>
  </Container>
);

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;

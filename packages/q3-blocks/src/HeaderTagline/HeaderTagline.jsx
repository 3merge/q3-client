import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

const HeaderTagline = ({ children, tagline, title }) => (
  <Container maxWidth="md" align="center" variant="section">
    <Box my={2}>
      <Typography variant="h1" gutterBottom>
        {title}
      </Typography>
      <Typography variant="subtitle2" component="p">
        {tagline}
      </Typography>
      {children}
    </Box>
  </Container>
);

HeaderTagline.defaultProps = {
  children: null,
};

HeaderTagline.propTypes = {
  children: PropTypes.node,
  tagline: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default HeaderTagline;

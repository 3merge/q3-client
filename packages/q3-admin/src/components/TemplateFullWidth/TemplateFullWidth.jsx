import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Template from '../Template';

const TemplateFullWidth = ({ children, title }) => (
  <Template>
    <Container maxWidth="md" component="article">
      <Box component="header" mb={1}>
        <Typography variant="h2">{title}</Typography>
      </Box>
      {children}
    </Container>
  </Template>
);

TemplateFullWidth.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.array,
  ]).isRequired,
  title: PropTypes.string.isRequired,
};

export default TemplateFullWidth;

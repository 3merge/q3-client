import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const Section = ({
  title,
  subtitle,
  label,
  margin,
  children,
}) => (
  <Container maxWidth="lg" component="section">
    <Container maxWidth="md" align="center">
      <Box mb={2} pt={margin ? 2 : 0}>
        <Typography
          variant="overline"
          gutterBottom
          color="secondary"
        >
          {label}
        </Typography>
        <Typography variant="h2" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle1" component="p">
          {subtitle}
        </Typography>
      </Box>
    </Container>
    {children}
  </Container>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default Section;

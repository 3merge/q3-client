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
  fullWidth,
}) => (
  <Container
    component="section"
    maxWidth={fullWidth ? 'xl' : 'lg'}
  >
    <Container maxWidth="md" align="center">
      <Box mb={2} pt={margin ? 2 : 0}>
        {label && (
          <Typography
            variant="overline"
            color="secondary"
            gutterBottom
          >
            {label}
          </Typography>
        )}
        <Typography variant="h2" gutterBottom>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="subtitle1" component="p">
            {subtitle}
          </Typography>
        )}
      </Box>
    </Container>
    {children}
  </Container>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  label: PropTypes.string,
  margin: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

Section.defaultProps = {
  label: '',
  margin: false,
  fullWidth: false,
};

export default Section;

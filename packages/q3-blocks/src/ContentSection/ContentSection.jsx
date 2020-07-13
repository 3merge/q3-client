import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

const ContentSection = ({
  children,
  center,
  maxWidth,
  ...rest
}) => (
  <Container
    component="section"
    align={center ? 'center' : undefined}
    maxWidth={maxWidth}
    {...rest}
  >
    <Box my={2}>{children}</Box>
  </Container>
);

ContentSection.defaultProps = {
  center: false,
  maxWidth: 'md',
};

ContentSection.propTypes = {
  children: PropTypes.oneOf([
    PropTypes.node,
    PropTypes.array,
  ]).isRequired,
  center: PropTypes.bool,
  maxWidth: PropTypes.oneOf(['xl', 'lg', 'md', 'sm']),
};

export default ContentSection;

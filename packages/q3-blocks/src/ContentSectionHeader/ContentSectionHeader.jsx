import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const ContentSectionHeader = ({
  gutterBottom,
  title,
  subtitle,
  label,
}) => (
  <Container maxWidth="md" align="center">
    <Box mb={gutterBottom}>
      {label && (
        <Typography
          variant="overline"
          color="secondary"
          component="span"
        >
          {label}
        </Typography>
      )}
      <Typography variant="h2" gutterBottom>
        {title}
      </Typography>
      <Typography variant="subtitle2" component="h3">
        {subtitle}
      </Typography>
    </Box>
  </Container>
);

ContentSectionHeader.defaultProps = {
  label: '',
  gutterBottom: 4,
};

ContentSectionHeader.propTypes = {
  label: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  gutterBottom: PropTypes.number,
};

export default ContentSectionHeader;

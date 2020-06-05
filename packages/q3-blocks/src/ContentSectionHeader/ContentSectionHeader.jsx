import React from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const ContentSectionHeader = ({
  title,
  subtitle,
  label,
}) => (
  <Container maxWidth="md" align="center">
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
  </Container>
);

ContentSectionHeader.defaultProps = {
  label: '',
};

ContentSectionHeader.propTypes = {
  label: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default ContentSectionHeader;

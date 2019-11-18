import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

const CallToAction = ({
  title,
  description,
  to,
  buttonText,
  imgSrc,
}) => (
  <Container component="aside" align="center" maxWidth="md">
    <Box py={2}>
      {imgSrc && (
        <img src={imgSrc} alt={title} width="450" />
      )}
      <Typography
        color="inherit"
        variant="h2"
        component="h3"
        gutterBottom
      >
        {title}
      </Typography>
      <Typography
        color="inherit"
        variant="body2"
        gutterBottom
        component="p"
      >
        {description}
      </Typography>
      {to && (
        <Box mt={3}>
          <Button
            component={Link}
            color="primary"
            size="large"
            variant="contained"
            to={to}
          >
            {buttonText}
          </Button>
        </Box>
      )}
    </Box>
  </Container>
);

CallToAction.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default CallToAction;

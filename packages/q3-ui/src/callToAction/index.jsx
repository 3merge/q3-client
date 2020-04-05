import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import Image from 'gatsby-image';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Wrapper from '../wrapper';

export const CallToActionButton = ({
  to,
  text,
  withColor,
}) =>
  to && text ? (
    <Box mt={2}>
      <Button
        component={Link}
        color={withColor ? 'inherit' : 'primary'}
        variant={withColor ? 'outlined' : 'contained'}
        size="large"
        to={to}
      >
        {text}
      </Button>
    </Box>
  ) : null;

CallToActionButton.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  withColor: PropTypes.bool,
};

CallToActionButton.defaultProps = {
  withColor: false,
};

const CallToAction = ({
  title,
  description,
  color,
  to,
  buttonText,
  fluid,
  ...etc
}) => (
  <Wrapper fullWidth color={color} {...etc}>
    <Container
      component="aside"
      align="center"
      maxWidth="md"
    >
      {fluid && (
        <Box mb={1}>
          <Image
            fluid={fluid}
            alt={title}
            objectFit="contain"
            objectPosition="50% 50%"
            style={{
              display: 'block',
              margin: 'auto',
              height: 65,
              width: 65,
            }}
          />
        </Box>
      )}
      <Typography
        color="inherit"
        variant="overline"
        component="h3"
        gutterBottom
      >
        {title}
      </Typography>
      <Typography
        color="inherit"
        variant="h3"
        gutterBottom
        component="p"
      >
        {description}
      </Typography>
      <CallToActionButton
        to={to}
        text={buttonText}
        withColor={Boolean(color)}
      />
    </Container>
  </Wrapper>
);

CallToAction.propTypes = {
  /**
   * Populates the overline option.
   */
  title: PropTypes.string.isRequired,

  /**
   * Populates the large text portion of the CTA.
   */
  description: PropTypes.string.isRequired,

  /**
   * Will conditionally render a button.
   */
  to: PropTypes.string.isRequired,

  /**
   * Will conditionally render a button.
   */
  buttonText: PropTypes.string.isRequired,

  /**
   * Passes into the Wrapper component.
   */
  color: PropTypes.string,

  /**
   * Will render a GatsbyImage component
   */
  fluid: PropTypes.shape({
    src: PropTypes.string,
  }),
};

CallToAction.defaultProps = {
  color: null,
  fluid: null,
};

export default CallToAction;

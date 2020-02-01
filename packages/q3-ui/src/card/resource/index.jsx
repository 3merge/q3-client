import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import CardHeader from '../header';

const ResourceCard = ({
  imgSrc,
  title,
  buttonText,
  to,
  secondaryButtonText,
  secondaryTo,
  ...rest
}) => (
  <Grid item md={6} sm={8} xs={10}>
    <Card>
      <Grid container spacing={1} alignItems="center">
        <Grid item lg={4} md={5} sm={6} xs={12}>
          <Box p={2}>
            <LazyLoadImage src={imgSrc} alt={title} />
          </Box>
        </Grid>
        <Grid item lg={8} md={7} sm={6} xs={12}>
          <CardContent>
            <CardHeader title={title} {...rest} />
            <Button
              tabIndex="-1"
              size="small"
              color="primary"
              variant="contained"
              component={Link}
              to={to}
            >
              {buttonText}
            </Button>
            {secondaryButtonText && (
              <Button
                tabIndex="-1"
                size="small"
                to={secondaryTo}
                component={Link}
              >
                {secondaryButtonText}
              </Button>
            )}
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  </Grid>
);

ResourceCard.propTypes = {
  /**
   * Card title text.
   */
  title: PropTypes.string.isRequired,

  /**
   * Card description text.
   */
  description: PropTypes.string.isRequired,

  /**
   * A logo URL for this resource.
   */
  imgSrc: PropTypes.string.isRequired,

  /**
   * The resource URL.
   */
  to: PropTypes.string.isRequired,

  /**
   * Custom text for the link.
   */
  buttonText: PropTypes.string.isRequired,

  /**
   * A second resource's URL. The second button will not render without this prop.
   */
  secondaryTo: PropTypes.string,

  /**
   * Custom text for a second link.
   */
  secondaryButtonText: PropTypes.string,
};

ResourceCard.defaultProps = {
  secondaryTo: null,
  secondaryButtonText: null,
};

export default ResourceCard;

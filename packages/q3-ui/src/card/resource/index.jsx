import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Image from 'gatsby-image';
import CardHeader from '../header';
import useStyles from '../useStyle';

const ResourceCard = ({
  fluid,
  title,
  buttonText,
  to,
  secondaryButtonText,
  secondaryTo,
  imgObjectFit,
  ...rest
}) => {
  const { imgCover } = useStyles({ imgObjectFit });
  const linkImage = to && !secondaryTo;

  const imgContainerProps = linkImage
    ? {
        'aria-label': title,
        display: 'block',
        className: imgCover,
        component: Link,
        to,
      }
    : {
        className: imgCover,
      };

  return (
    <Grid item sm={6} xs={12}>
      <Card>
        <Grid container spacing={1} alignItems="center">
          <Grid item lx={4} lg={6} xs={12}>
            <Box {...imgContainerProps}>
              <Image
                fluid={fluid}
                alt={title}
                style={{ width: '100%', height: '100%' }}
              />
            </Box>
          </Grid>
          <Grid item lx={8} lg={6} xs={12}>
            <CardContent>
              <CardHeader title={title} {...rest} />
              <Button
                tabIndex="-1"
                size="small"
                color="primary"
                variant="contained"
                component={Link}
                style={{ marginRight: '0.5rem' }}
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
};

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
  fluid: PropTypes.shape({
    src: PropTypes.string,
  }).isRequired,

  /**
   * Defines the ObjectFit value for images.
   */
  imgObjectFit: PropTypes.oneOf(['contain', 'cover']),

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
  imgObjectFit: 'cover',
};

export default ResourceCard;

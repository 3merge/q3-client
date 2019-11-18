import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  media: {
    height: (props) => (props.imageSizeSmall ? 60 : 190),
  },
});

const Media = ({
  icon,
  title,
  imgSrc,
  imageSizeSmall,
  imgStyle,
}) => {
  const { media } = useStyles({ imageSizeSmall });
  return (
    <>
      {imgSrc && (
        <LazyLoadImage
          alt={title}
          className={media}
          src={imgSrc}
          style={imgStyle}
        />
      )}
      {icon}
    </>
  );
};

export const FeatureHorizontal = ({
  body,
  title,
  ...rest
}) => (
  <Grid item md={4} sm={6} xs={12}>
    <Box p={4}>
      <Grid container spacing={4}>
        <Grid item xs={3}>
          <Box textAlign="center">
            <Media {...rest} title={title} imageSizeSmall />
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="body2" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {body}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Grid>
);

const Feature = ({
  align,
  body,
  lg,
  sm,
  xs,
  title,
  children,
  ...rest
}) => (
  <Grid item lg={lg} sm={sm} xs={xs}>
    <Box p={2} textAlign={align}>
      <Box mb={1}>
        <Media {...rest} title={title} />
      </Box>
      <Typography variant="h3" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {body}
      </Typography>
      {children}
    </Box>
  </Grid>
);

Feature.propTypes = {
  lg: PropTypes.number,
  sm: PropTypes.number,
  xs: PropTypes.number,
};

Feature.defaultProps = {
  align: 'center',
  lg: 4,
  sm: 6,
  xs: 12,
};

export default Feature;

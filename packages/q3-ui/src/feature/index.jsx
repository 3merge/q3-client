import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  media: {
    height: (props) => (props.imageSizeSmall ? 60 : 190),
  },
});

const FeatureSizingBase = ({
  children,
  lg,
  md,
  sm,
  xs,
}) => (
  <Grid item lg={lg} md={md} sm={sm} xs={xs}>
    {children}
  </Grid>
);

FeatureSizingBase.propTypes = {
  children: PropTypes.node,
  lg: PropTypes.number,
  md: PropTypes.number,
  sm: PropTypes.number,
  xs: PropTypes.number,
};

FeatureSizingBase.defaultProps = {
  children: null,
  lg: 4,
  md: 4,
  sm: 6,
  xs: 12,
};

export const Media = ({
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

Media.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
  imgSrc: PropTypes.string.isRequired,
  imageSizeSmall: PropTypes.bool,
  // eslint-disable-next-line
  imgStyle: PropTypes.object,
};

Media.defaultProps = {
  icon: null,
  imageSizeSmall: false,
  title: '',
  imgStyle: {},
};

export const FeatureHorizontal = ({
  lg,
  md,
  sm,
  xs,
  body,
  title,
  ...rest
}) => (
  <FeatureSizingBase lg={lg} md={md} sm={sm} xs={xs}>
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
  </FeatureSizingBase>
);

FeatureHorizontal.propTypes = {
  ...FeatureSizingBase.propTypes,
};

const FeatureBase = ({
  align,
  title,
  body,
  children,
  ...rest
}) => (
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
);

FeatureBase.propTypes = {
  align: PropTypes.oneOf(['left', 'center', 'right']),
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  children: PropTypes.node,
};

FeatureBase.defaultProps = {
  align: 'center',
  children: null,
};

const Feature = ({ lg, md, sm, xs, children, ...rest }) => (
  <FeatureSizingBase lg={lg} md={md} sm={sm} xs={xs}>
    <FeatureBase {...rest}>{children}</FeatureBase>
  </FeatureSizingBase>
);

Feature.propTypes = {
  ...FeatureSizingBase.propTypes,
  ...FeatureBase.propTypes,
};

export default Feature;

export const ClickableFeature = ({
  lg,
  md,
  sm,
  xs,
  children,
  CardActionAreaProps,
  ...rest
}) => (
  <FeatureSizingBase lg={lg} md={md} sm={sm} xs={xs}>
    <Card>
      <CardActionArea {...CardActionAreaProps}>
        <FeatureBase {...rest}>{children}</FeatureBase>
      </CardActionArea>
    </Card>
  </FeatureSizingBase>
);

ClickableFeature.propTypes = {
  ...FeatureSizingBase.propTypes,
  ...FeatureBase.propTypes,
};

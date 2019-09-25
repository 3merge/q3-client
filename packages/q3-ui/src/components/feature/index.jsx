import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  media: {
    height: (props) => (props.imageSizeSmall ? 80 : 190),
  },
});

export const FeatureHorizontal = ({
  body,
  title,
  imgSrc,
}) => {
  const { media } = useStyles({ imageSizeSmall: true });
  return (
    <Grid item xs={4}>
      <Box p={4}>
        <Grid container spacing={4}>
          <Grid item xs={3}>
            <img
              alt={title}
              className={media}
              src={imgSrc}
            />
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
};

const Feature = ({
  align,
  body,
  imageSizeSmall,
  columnSize,
  title,
  children,
  imgSrc,
}) => {
  const { media } = useStyles({ imageSizeSmall });
  return (
    <Grid item xs={columnSize}>
      <Box p={4} textAlign={align}>
        <Box mb={2}>
          <img alt={title} className={media} src={imgSrc} />
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
};

Feature.propTypes = {};
Feature.defaultProps = {
  align: 'center',
  columnSize: 4,
};

export default Feature;

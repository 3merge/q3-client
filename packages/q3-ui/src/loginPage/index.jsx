import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { get } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  img: {
    backgroundImage:
      'url(https://source.unsplash.com/collection/15938558/daily)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundBlendMode: 'multiply',
    backgroundColor: get(theme, 'palette.primary.light'),
    [theme.breakpoints.down('sm')]: {
      height: 350,
      width: '100%',
    },
  },
  root: {
    height: '100vh',
    overflowX: 'hidden',
    overflowY: 'auto',
    boxSizing: 'border-box',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      width: '100%',
    },
  },
  view: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  mobileWrapper: {
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      backgroundColor: get(
        theme,
        'palette.background.paper',
      ),
      minHeight: '100vh',
    },
  },
}));

const FeaturedImage = ({ children }) => {
  const { root, img, view, mobileWrapper } = useStyles();

  return (
    <Box>
      <Grid container className={mobileWrapper}>
        <Grid item md={6} sm={12} className={img} />
        <Grid item md={6} sm={12} className={view}>
          <Box
            component="main"
            className={root}
            display="flex"
            flexWrap="wrap"
            alignItems="center"
          >
            <Box m={4}>{children}</Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

FeaturedImage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FeaturedImage;

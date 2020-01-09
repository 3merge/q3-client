import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { get } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  img: {
    backgroundImage:
      'url(https://source.unsplash.com/daily?nature)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundBlendMode: 'multiply',
    backgroundColor: get(theme, 'palette.primary.light'),
    [theme.breakpoints.down('sm')]: {
      height: 350,
      width: '100%',
    },
    [theme.breakpoints.down('xs')]: {
      height: 225,
      width: '100%',
    },
  },
  root: {
    height: '100vh',
    [theme.breakpoints.down('sm')]: {
      height: '100%',
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
      padding: theme.spacing(2),
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
          <Paper>
            <Box component="main">
              <Box
                className={root}
                display="flex"
                alignItems="center"
                p={4}
              >
                {children}
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

FeaturedImage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FeaturedImage;

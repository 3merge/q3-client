import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const FeaturedImage = ({ children, url }) => (
  <Box>
    <Grid container>
      <Grid
        item
        md={6}
        sm={5}
        xs={12}
        style={{
          backgroundImage: `url(${url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item md={6} sm={7} xs={12}>
        <Paper>
          <Box p={2} component="main" height="100vh">
            <Box
              height="100%"
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

FeaturedImage.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default FeaturedImage;

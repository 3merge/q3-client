import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useTheme } from '@material-ui/core/styles';
import { get } from 'lodash';

const FeaturedImage = ({ children }) => {
  const theme = useTheme();

  return (
    <Box>
      <Grid container>
        <Grid
          item
          md={6}
          sm={5}
          xs={12}
          style={{
            backgroundImage:
              'url(https://source.unsplash.com/daily?nature)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay',
            backgroundColor: get(
              theme,
              'palette.primary.light',
            ),
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
};

FeaturedImage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FeaturedImage;

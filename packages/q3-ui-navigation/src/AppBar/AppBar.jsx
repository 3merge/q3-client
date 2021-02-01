import React from 'react';
import { Box, Fade, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import LogoLandscape from '../LogoLandscape';
import Horizontal from '../Horizontal';

const AppBar = ({ children, menuItems }) => {
  return (
    <Box
      display="block"
      height="auto"
      position="relative"
      width="100%"
      zIndex="10"
    >
      <Box
        height="100%"
        position="relative"
        width="100%"
        style={{
          transition: 'width 230ms ease-in',
        }}
      >
        <Box height="100%" width="100%">
          <Box
            alignItems="center"
            bgcolor="background.default"
            component="header"
            display="flex"
            height="100%"
            flexDirection="row"
            justifyContent="space-between"
            width="100%"
            style={{
              transition: 'background 500ms',
            }}
          >
            <Grid
              alignItems="center"
              container
              direction="row"
              disableGutters
              style={{ width: '100%' }}
            >
              <Grid item>
                <Fade in>
                  <LogoLandscape />
                </Fade>
              </Grid>
              <Grid item>
                <Horizontal menuItems={menuItems} />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

AppBar.defaultProps = {
  children: null,
};

AppBar.propTypes = {
  children: PropTypes.node,
};

export default AppBar;

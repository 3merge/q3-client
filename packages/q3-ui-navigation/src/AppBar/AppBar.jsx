import React from 'react';
import { Box, Fade, Grid, Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import LogoLandscape from '../LogoLandscape';
import Horizontal from '../Horizontal';

const useStyle = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
  },
}));

const AppBar = ({ children, menuItems }) => {
  const cls = useStyle();
  return (
    <Box
      id="q3-appbar"
      component="header"
      display="block"
      height="auto"
      position="relative"
      width="100%"
      zIndex={10}
      className={cls.root}
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
            bgcolor="background.paper"
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
              <Grid item component="nav">
                <Box pl={5}>
                  <Horizontal menuItems={menuItems} />
                </Box>
              </Grid>
            </Grid>
            {children}
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

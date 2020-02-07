import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import MenuIcon from '@material-ui/icons/Menu';
import Offcanvas from 'q3-ui/lib/offcanvas';
import ProfileBar from 'q3-ui/lib/profileBar';
import Toolbar from 'q3-ui/lib/toolbar';
import Hidden from '@material-ui/core/Hidden';
import useStyles from './useStyle';

const Main = ({ render, renderAside, ProfileBarProps }) => {
  const cls = useStyles();

  return (
    <Box component="article">
      <Hidden mdUp implementation="css">
        <Toolbar isLoggedIn {...ProfileBarProps}>
          <Offcanvas left menu={renderAside}>
            {(toggle) => (
              <Fab
                onClick={toggle}
                aria-label="Open menu"
                color="secondary"
                size="small"
              >
                <MenuIcon />
              </Fab>
            )}
          </Offcanvas>
        </Toolbar>
      </Hidden>
      <Grid container className={cls.offsetHeight}>
        <Grid item>
          <Box className={cls.sticky}>
            <ProfileBar {...ProfileBarProps}>
              {renderAside()}
            </ProfileBar>
          </Box>
        </Grid>
        <Grid
          id="q3-main-view"
          item
          className={cls.muted}
          component="main"
        >
          <Box pb={6}>{render()}</Box>
        </Grid>
      </Grid>
    </Box>
  );
};

Main.propTypes = {
  /**
   * Renderer function for inside <main />.
   */
  render: PropTypes.func.isRequired,

  /**
   * Renderer function for inside <aside />.
   */
  renderAside: PropTypes.func.isRequired,

  /**
   * Props passed directly to Q3's <ProfileBar />
   */
  ProfileBarProps: PropTypes.shape({
    name: PropTypes.string,
    imgSrc: PropTypes.string,
    menuItems: PropTypes.array,
  }).isRequired,
};

export default Main;

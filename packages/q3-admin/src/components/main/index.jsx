import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import ProfileBar from 'q3-ui/lib/profileBar';
import SwapHoriz from '@material-ui/icons/KeyboardArrowLeft';
import Close from '@material-ui/icons/KeyboardArrowRight';
import Sidebar from 'q3-ui/lib/sidebar';
import Hidden from '@material-ui/core/Hidden';
import { useToggle } from 'useful-state';
import useStyles from './useStyle';

const Main = ({ render, renderAside, ProfileBarProps }) => {
  const cls = useStyles();

  return (
    <Box component="article">
      <Grid container className={cls.offsetHeight}>
        <Grid item>
          <Box className={cls.sticky}>
            <Grid container>
              {/* <ProfileBar
                {...ProfileBarProps}
                offcanvas={renderAside}
                isLoggedIn
              /> */}

              <Sidebar
                id="q3-collapseable-sideview"
                renderTrigger={() => null}
              >
                {renderAside()}
              </Sidebar>
            </Grid>
          </Box>
        </Grid>
        <Grid
          id="q3-main-view"
          item
          className={cls.muted}
          component="main"
        >
          {render()}
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

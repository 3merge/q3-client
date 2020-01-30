import React from 'react';
import PropTypes from 'prop-types';
import SwapHoriz from '@material-ui/icons/SwapHoriz';
import Filter from '@material-ui/icons/FilterList';
import Close from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import Fade from '@material-ui/core/Fade';
import { useToggle } from 'useful-state';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useStyles from './useStyles';

const FilterLayout = ({ renderAside, renderMain }) => {
  const isMobile = useMediaQuery('(max-width:958px)');
  const { toggle, state } = useToggle(!isMobile);
  const { root, trigger, overflow } = useStyles();

  const getIcon = () => {
    if (isMobile && !state) return <Filter />;
    if (isMobile && state) return <Close />;
    return <SwapHoriz />;
  };

  return (
    <Grid container style={{ minHeight: '100vh' }}>
      <Fade
        direction="left"
        style={{ width: !state ? 0 : 'auto' }}
        in={state}
      >
        <Grid item>
          <Box className={root}>
            <Box py={2} px={2} className={overflow}>
              {renderAside()}
            </Box>
          </Box>
        </Grid>
      </Fade>
      <Grid item style={{ flex: 1 }}>
        <Fab
          size="small"
          aria-label="Toggle filter panel"
          onClick={toggle}
          className={trigger}
        >
          {getIcon()}
        </Fab>
        <Box>{renderMain()}</Box>
      </Grid>
    </Grid>
  );
};

FilterLayout.propTypes = {
  /**
   * Renderer function for populating filter form.
   */
  renderAside: PropTypes.func.isRequired,

  /**
   * Renderer function for populating main content view.
   */
  renderMain: PropTypes.func.isRequired,
};

export default FilterLayout;

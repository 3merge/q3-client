import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import Hidden from '@material-ui/core/Hidden';
import {
  ThemeProvider,
  createMuiTheme,
} from '@material-ui/core/styles';
import { useToggle } from 'useful-state';
import Grid from '@material-ui/core/Grid';

import SwapHoriz from '@material-ui/icons/KeyboardArrowLeft';
import Close from '@material-ui/icons/KeyboardArrowRight';
import { AccountMenu } from '../toolbar';
import { LogoHomeLink } from '../profileBar';

const useStyles = makeStyles((theme) => ({
  sticky: {
    position: 'sticky',
    top: 0,
  },
  trigger: {
    position: 'absolute',
    top: '8rem',
    left: 'calc(100% - 1rem)',
  },
  colourful: {
    backgroundColor: theme.palette.primary.main,
    boxShadow: theme.shadows[1],
    boxSizing: 'border-box',
    color: '#FFF',
    height: '100vh',
    overflowY: 'auto',
    overflowX: 'hidden',
    paddingTop: theme.spacing(2),
    '& *': {
      color: '#FFF',
      fontSize: '1.11rem',
    },
  },
  mobile: {
    backgroundColor: theme.palette.primary.main,
    boxSizing: 'border-box',
    padding: theme.spacing(2),
    width: 185,
  },
}));

const Sidebar = ({ children }) => {
  const { colourful, trigger } = useStyles();
  const { toggle, state } = useToggle();

  const getIcon = () => (state ? <Close /> : <SwapHoriz />);

  return (
    <Hidden smDown implementation="css">
      <ThemeProvider
        theme={createMuiTheme({
          palette: {
            type: 'dark',
          },
        })}
      >
        <Box
          className={colourful}
          height="100%"
          component="aside"
          width={state ? 80 : 275}
          style={{ transition: 'width 350ms' }}
        >
          <Grid
            container
            direction="column"
            justify="space-between"
            style={{ height: '100%' }}
          >
            <Grid item>
              <LogoHomeLink name="3merge" />

              {children}
            </Grid>
            <Grid item>
              <Box my={1} p={2}>
                <AccountMenu isLoggedIn items={[]} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>

      <Fab
        size="small"
        aria-label="Toggle filter panel"
        onClick={toggle}
        className={trigger}
      >
        {getIcon()}
      </Fab>
    </Hidden>
  );
};

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Sidebar;

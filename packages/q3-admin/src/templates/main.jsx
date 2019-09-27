import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Components } from 'q3-ui';

const useStyles = makeStyles((theme) => ({
  offsetHeight: {
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  sticky: {
    position: 'sticky',
    top: 0,
  },
  muted: {
    flex: '1',
    position: 'relative',
    paddingTop: 140,
  },
  contrastBg: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    padding: theme.spacing(3),
    minHeight: '100vh',
    '& *.Mui-selected': {
      background: 'rgba(255, 255, 255, 0.04)',
    },
    textAlign: 'center',
  },
  float: {
    position: 'absolute',
    right: '1rem',
    top: '1rem',
    zIndex: 10,
  },
}));

const { Sidebar, ProfileBar } = Components;

const AppLayout = ({
  render,
  renderAside,
  ProfileBarProps,
}) => {
  const cls = useStyles();
  return (
    <Box component="article">
      <Grid container className={cls.offsetHeight}>
        <Grid item>
          <Box className={cls.sticky}>
            <Grid container>
              <ProfileBar
                {...ProfileBarProps}
                offcanvas={renderAside}
              />
              <Sidebar renderTrigger={() => null}>
                {renderAside()}
              </Sidebar>
            </Grid>
          </Box>
        </Grid>
        <Grid item className={cls.muted} component="main">
          {render()}
        </Grid>
      </Grid>
    </Box>
  );
};

AppLayout.propTypes = {
  render: PropTypes.func.isRequired,
  renderAside: PropTypes.func.isRequired,
};

export default AppLayout;

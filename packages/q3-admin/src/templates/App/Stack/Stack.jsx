import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { get } from 'lodash';
import AppBar from '@material-ui/core/AppBar';
import Notifications from '../../../containers/Notifications';
import ProfileActions from '../../../components/ProfileActions';
import Viewport from '../../../components/Viewport';
import useStyle from '../../../components/useStyle';
import * as Search from '../../../components/Search';
import * as Navigation from '../../../components/Navigation';

export const goTo = (path) => () => navigate(path);

const Admin = ({
  socket,
  children,
  profileItems,
  AppProps,
  NavProps,
  ProfileProps,
  SocketProps,
}) => {
  const root = get(AppProps, 'directory', '/');

  return (
    <Viewport>
      <Box height="100%" width="100%">
        <AppBar
          color="inherit"
          elevation={0}
          position="relative"
        >
          <Grid
            alignItems="center"
            container
            justify="space-between"
          >
            <Grid item>
              <Grid alignItems="center" container>
                <Grid item>
                  <img src={NavProps.logoSrc} height={85} />
                </Grid>
                <Grid item>
                  <Navigation.Horizontal
                    {...NavProps}
                    root={root}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  <Search.Drawer />
                </Grid>
                <Grid item>
                  <ProfileActions
                    profileItems={[
                      ...profileItems,
                      {
                        onClick: goTo(
                          `${root}account/profile`,
                        ),
                        label: 'profile',
                      },
                      {
                        onClick: goTo(
                          `${root}account/change-password`,
                        ),
                        label: 'changePassword',
                      },
                    ]}
                  >
                    <Notifications socket={socket} />
                  </ProfileActions>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </AppBar>
        {children}
      </Box>
    </Viewport>
  );
};

Admin.propTypes = {
  logoSrc: PropTypes.string.isRequired,
  AppProps: PropTypes.shape({
    pages: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,

  socket: PropTypes.string.isRequired,

  /**
   * An array of tour steps (label, html ID, etc.).
   */
  tours: PropTypes.arrayOf(PropTypes.object),

  /**
   * Each key-value pair corresponds with a collection name and its menu icon.
   */
  icons: PropTypes.shape({}),

  /**
   * An array of actions to populate the profile dropdown menu.
   */
  profileItems: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func,
      label: PropTypes.string,
    }),
  ),
};

Admin.defaultProps = {
  icons: {},
  tours: [],
  profileItems: [],
};

export default Admin;

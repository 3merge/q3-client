import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import Box from '@material-ui/core/Box';
import { get } from 'lodash';
import { IconButton, Hidden } from '@material-ui/core';
import MenuOpen from '@material-ui/icons/MenuOpen';
import { useToggle } from 'useful-state';
import Notifications from '../../../containers/Notifications';
import Navigation from '../../../components/Navigation';
import ProfileActions from '../../../components/ProfileActions';
import Viewport from '../../../components/Viewport';
import useStyle from '../../../components/useStyle';
import * as Search from '../../../components/Search';
import Tray from '../../../components/Tray';
import Aside from '../../../components/Aside';
import * as Identity from '../../../components/Identity';

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
  const { state, toggle } = useToggle(true);

  const cls = useStyle({
    collapsed: !state,
  });

  return (
    <Viewport>
      <Box className={cls.side}>
        <Aside
          renderHeader={
            <Identity.Block src="https://logoipsum.com/logo/logo-25.svg" />
          }
        >
          <Navigation {...NavProps} root={root} />
        </Aside>
      </Box>
      <Box className={cls.main}>
        <Tray>
          <IconButton onClick={toggle}>
            <MenuOpen />
          </IconButton>
          <Hidden smDown>
            <Search.Autosuggest />
          </Hidden>
          <ProfileActions
            profileItems={[
              ...profileItems,
              {
                onClick: goTo(`${root}account/profile`),
                label: 'profile',
              },
              {
                onClick: goTo(
                  `${root}account/change-password`,
                ),
                label: 'changePassword',
              },
            ]}
          />
          <Notifications socket={socket} />
        </Tray>

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

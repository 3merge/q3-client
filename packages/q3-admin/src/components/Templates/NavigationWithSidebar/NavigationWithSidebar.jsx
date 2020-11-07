import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import { get } from 'lodash';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import IconButton from 'q3-ui/lib/iconButton';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { useToggle } from 'useful-state';
import { usePages } from '../../../hooks';
import Notifications from '../../../containers/Notifications';
import ProfileActions from '../../ProfileActions';
import useStyle from '../../useStyle';
import Tray from '../../Tray';
import Search from '../../../containers/search';
import Navigation from '../../Navigation';

export const goTo = (path) => () => navigate(path);

const Admin = ({
  icons,
  socket,
  tours,
  children,
  profileItems,
  AppProps,
  NavProps,
  ProfileProps,
  SocketProps,
}) => {
  const root = get(AppProps, 'directory', '/');
  const { state, toggle } = useToggle();
  const cls = useStyle({
    collapsed: state,
  });

  return (
    <>
      <Box className={cls.side}>
        <Navigation
          {...NavProps}
          menuItems={usePages(AppProps.pages, icons)}
          root={root}
        />
      </Box>
      <Box className={cls.main}>
        <Tray>
          <IconButton
            label="toggleMenu"
            icon={MenuOpenIcon}
            buttonProps={{
              onClick: toggle,
            }}
          />
          <Search />
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
          >
            <Notifications socket={socket} />
          </ProfileActions>
        </Tray>
        {children}
      </Box>
    </>
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

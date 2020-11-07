import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import Box from '@material-ui/core/Box';
import { get } from 'lodash';
import Dialog from 'q3-ui-dialog';
import Fab from '@material-ui/core/Fab';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import App from './components/app';
import { usePages } from './hooks';
import Notifications from './containers/Notifications';
import Tours from './containers/tour';
import Profile from './containers/Profile';
import ProfileChangePassword from './containers/ProfileChangePassword';
import Socket from './containers/Socket';
import ProfileActions from './components/ProfileActions';
import Viewport from './components/Viewport';
import useStyle from './components/useStyle';
import {
  NavigationWithSidebar,
  ListStack,
  ListWithSidebar,
} from './components/Templates';
import { Templates } from './containers/state';

const Settings = ({ children, ...props }) => {
  const [value, setValue] = React.useState(props);

  return (
    <Templates.Provider value={value}>
      <Dialog
        renderTrigger={(onClick) => (
          <Box
            position="fixed"
            bottom={2}
            left={2}
            zIndex={100}
          >
            <Fab onClick={onClick}>
              <SettingsApplicationsIcon />
            </Fab>
          </Box>
        )}
        renderContent={() => (
          <>
            <p>List Template:</p>
            <ul>
              <li>
                Columns:{' '}
                <button
                  type="button"
                  onClick={() =>
                    setValue((prev) => ({
                      ...prev,
                      List: ListWithSidebar,
                    }))
                  }
                >
                  Apply
                </button>
              </li>
              <li>
                Stacked:{' '}
                <button
                  type="button"
                  onClick={() =>
                    setValue((prev) => ({
                      ...prev,
                      List: ListStack,
                    }))
                  }
                >
                  Apply
                </button>
              </li>
            </ul>
          </>
        )}
      />
      {children}
    </Templates.Provider>
  );
};

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
  TemplateProps,
}) => {
  const cls = useStyle();
  const root = get(AppProps, 'directory', '/');

  return (
    <Settings {...TemplateProps}>
      <Tours steps={tours}>
        {(restartTour) => (
          <Viewport>
            <Socket {...SocketProps}>
              <NavigationWithSidebar
                root={root}
                socket={socket}
                AppProps={AppProps}
                NavProps={NavProps}
              >
                <App {...AppProps}>
                  <Profile
                    path="/account/profile"
                    {...ProfileProps}
                  />
                  <ProfileChangePassword path="/account/change-password" />
                </App>
                {children}
              </NavigationWithSidebar>
            </Socket>
          </Viewport>
        )}
      </Tours>
    </Settings>
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

  TemplateProps: PropTypes.shape({
    List: PropTypes.node,
  }),
};

Admin.defaultProps = {
  icons: {},
  tours: [],
  profileItems: [],
  TemplateProps: {
    List: ListStack,
  },
};

export default Admin;

import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import App from './components/app';
import { usePages } from './hooks';
import Notifications from './containers/Notifications';
import Tours from './containers/tour';
import Navigation from './components/Navigation';
import ProfileActions from './components/ProfileActions';
import Viewport from './components/Viewport';
import useStyle from './components/useStyle';

const Admin = ({
  icons,
  socket,
  tours,
  children,
  profileItems,
  AppProps,
  NavProps,
}) => {
  const cls = useStyle();
  return (
    <Tours steps={tours}>
      {(restartTour) => (
        <Viewport>
          <Navigation
            {...NavProps}
            menuItems={usePages(AppProps.pages, icons)}
          />
          <Box className={cls.main}>
            <ProfileActions
              profileItems={[
                ...profileItems,
                {
                  onClick: restartTour,
                  label: 'restartTour',
                },
              ]}
            >
              <Notifications socket={socket} />
            </ProfileActions>
            <App {...AppProps} />
            {children}
          </Box>
        </Viewport>
      )}
    </Tours>
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

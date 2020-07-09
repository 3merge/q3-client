import React from 'react';
import PropTypes from 'prop-types';
import App from './components/app';
import { usePages } from './hooks';
import Notifications from './containers/Notifications';
import Tours from './containers/tour';
import Navigation from './components/Navigation';
import ProfileActions from './components/ProfileActions';
import Viewport from './components/Viewport';

const Admin = ({
  logoSrc,
  pages,
  icons,
  socket,
  tours,
  children,
  profileItems,
}) => (
  <Tours steps={tours}>
    {(restartTour) => (
      <Viewport>
        <Navigation
          logoSrc={logoSrc}
          menuItems={usePages(pages, icons)}
        />
        <div style={{ flex: 1 }}>
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
          <App pages={pages} />
          {children}
        </div>
      </Viewport>
    )}
  </Tours>
);

Admin.propTypes = {
  logoSrc: PropTypes.string.isRequired,
  pages: PropTypes.arrayOf(PropTypes.object).isRequired,
  icons: PropTypes.arrayOf(PropTypes.object),
  socket: PropTypes.string.isRequired,
  tours: PropTypes.arrayOf(PropTypes.object),
};

Admin.defaultProps = {
  icons: [],
  tours: [],
  profileItems: [],
  children: null,
};

export default Admin;

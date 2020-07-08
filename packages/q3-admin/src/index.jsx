import React from 'react';
import PropTypes from 'prop-types';
import App from './components/app';
import { usePages } from './hooks';
import Notifications from './containers/Notifications';
import Tours from './containers/tour';
import Navigation from './components/Navigation';
import Tray from './components/Tray';
import Viewport from './components/Viewport';

const Admin = ({
  logoSrc,
  pages,
  icons,
  socket,
  tours,
}) => (
  <Tours steps={tours}>
    {(restartTour) => (
      <Viewport>
        <Navigation
          logoSrc={logoSrc}
          menuItems={usePages(pages, icons)}
        />
        <div style={{ flex: 1 }}>
          <Tray
            notificationComponent={
              <Notifications socket={socket} />
            }
            profileItems={[
              {
                onClick: restartTour,
                label: 'restartTour',
              },
            ]}
          />
          <App pages={pages} />
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
};

export default Admin;

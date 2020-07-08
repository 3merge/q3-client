import React from 'react';
import PropTypes from 'prop-types';
import Hidden from '@material-ui/core/Hidden';
import App from './components/app';
import { usePages } from './hooks';
import Notifications from './containers/Notifications';
import Tours from './containers/tour';
import Navigation from './components/Navigation';
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
          notificationComponent={
            <Notifications socket={socket} />
          }
          menuItems={usePages(pages, icons)}
          profileItems={[
            {
              onClick: restartTour,
              label: 'restartTour',
            },
          ]}
        />
        <div style={{ flex: 1 }}>
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

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
  logoSrc,
  pages,
  icons,
  socket,
  tours,
  children,
  profileItems,
  subPages,
}) => {
  const cls = useStyle();
  return (
    <Tours steps={tours}>
      {(restartTour) => (
        <Viewport>
          <Navigation
            logoSrc={logoSrc}
            menuItems={usePages(pages, icons)}
            subMenuItems={subPages}
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
            <App pages={pages} />
            {children}
          </Box>
        </Viewport>
      )}
    </Tours>
  );
};

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

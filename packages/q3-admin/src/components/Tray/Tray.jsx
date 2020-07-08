import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ProfileActions from '../ProfileActions';

const Tray = ({
  logoSrc,
  notificationComponent,
  menuItems,
  profileItems,
}) => {
  return (
    <Grid
      container
      justify="space-between"
      style={{
        position: 'absolute',
        top: 0,
        right: '1rem',
      }}
    >
      {/** Intentionally leaving dead space so that we can position the SidePanel toggle on mobile */}
      <Grid item />
      <Grid item>
        <ProfileActions profileItems={profileItems}>
          {notificationComponent}
        </ProfileActions>
      </Grid>
    </Grid>
  );
};

export default Tray;

import React from 'react';
import Box from '@material-ui/core/Box';
import NavbarProfileLink from '../NavbarProfileLink';
import NavbarSystemLink from '../NavbarSystemLink';
import Notifications from '../../containers/Notifications';

const Toolbar = () => (
  <Box
    style={{
      boxShadow: 'rgb(0 0 0 / 8%) 0px -3px 18px 0px',
      zIndex: 1,
      position: 'relative',
    }}
    bgcolor="background.paper"
    display="flex"
    justifyContent="space-between"
    id="app-toolbar"
    height={95}
    p={2}
  >
    <Box flex={1} id="app-toolbar-collection-actions" />
    <Box display="flex">
      <NavbarSystemLink />
      <Notifications />
      <NavbarProfileLink />
    </Box>
  </Box>
);

export default Toolbar;

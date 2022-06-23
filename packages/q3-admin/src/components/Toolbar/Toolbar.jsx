import React from 'react';
import Box from '@material-ui/core/Box';
import NavbarProfileLink from '../NavbarProfileLink';
import NavbarSystemLink from '../NavbarSystemLink';
import Notifications from '../../containers/Notifications';
import useStyle from './styles';

const Toolbar = () => (
  <Box
    className={useStyle().root}
    bgcolor="background.paper"
    display="flex"
    justifyContent="space-between"
    id="app-toolbar"
  >
    <Box flex={1} id="app-toolbar-collection-actions" />
    <Box alignItems="center" display="flex">
      <NavbarSystemLink />
      <Notifications />
      <NavbarProfileLink />
    </Box>
  </Box>
);

export default Toolbar;

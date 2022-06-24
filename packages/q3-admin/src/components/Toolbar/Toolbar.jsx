import React from 'react';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import NavbarProfileLink from '../NavbarProfileLink';
import ButtonWithIcon from '../ButtonWithIcon';
import Notifications from '../../containers/Notifications';
import useStyle from './styles';

const Toolbar = () => {
  const cls = useStyle();

  return (
    <Box
      className={cls.root}
      bgcolor="background.paper"
      display="flex"
      justifyContent="space-between"
      id="app-toolbar"
    >
      <Hidden mdUp>
        <ButtonWithIcon
          label="menu"
          icon={MenuIcon}
          onClick={() => {
            document.getElementById('app-menu').click();
          }}
        />
      </Hidden>
      <Box
        className={cls.actions}
        flex={1}
        id="app-toolbar-collection-actions"
      />
      <Notifications />
      <NavbarProfileLink />
    </Box>
  );
};

export default Toolbar;

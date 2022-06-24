import React from 'react';
import { Link } from '@reach/router';
import { string } from 'q3-ui-helpers';
import {
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Box,
  Hidden,
} from '@material-ui/core';
import AccountBox from '@material-ui/icons/AccountBox';
import { AuthContext } from 'q3-ui-permissions';
import ButtonWithIcon from '../ButtonWithIcon';
import DropdownMenu from '../DropdownMenu';
import { logout } from '../NavbarFooterLinks/NavbarFooterLinks';

const NavbarProfileLink = () => {
  const { state } = React.useContext(AuthContext);

  return (
    <Box display="inline-block">
      <Hidden mdUp>
        <ButtonWithIcon
          component={Link}
          label="profile"
          icon={AccountBox}
          to="account"
        />
      </Hidden>
      <Hidden mdDown>
        <DropdownMenu
          items={[
            {
              label: 'profile',
              to: 'account',
            },
            // HOW TO INSERT CUSTOM???
            {
              label: 'logout',
              onClick: logout,
            },
          ]}
        >
          {(toggle) => (
            <ListItem
              button
              dense
              style={{
                padding: 0,
                whiteSpace: 'nowrap',
              }}
              onClick={toggle}
            >
              <ListItemAvatar>
                <Avatar src={state?.profile?.photo} />
              </ListItemAvatar>
              <ListItemText
                primary={string.makeName(state?.profile)}
                secondary={state?.profile?.role}
              />
            </ListItem>
          )}
        </DropdownMenu>
      </Hidden>
    </Box>
  );
};

NavbarProfileLink.defaultProps = {};
NavbarProfileLink.propTypes = {};

export default NavbarProfileLink;

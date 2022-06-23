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

const NavbarProfileLink = () => {
  const { state } = React.useContext(AuthContext);

  return (
    <Box display="inline-block">
      <Hidden mdUp>
        <ButtonWithIcon
          component={Link}
          to="account"
          label="profile"
          icon={AccountBox}
        />
      </Hidden>
      <Hidden mdDown>
        <ListItem
          button
          dense
          component={Link}
          to="account"
          style={{ padding: 0 }}
        >
          <ListItemAvatar>
            <Avatar
              src={state?.profile?.photo}
              variant="rounded"
            />
          </ListItemAvatar>
          <ListItemText
            primary={string.makeName(state?.profile)}
            secondary={state?.profile?.role}
          />
        </ListItem>
      </Hidden>
    </Box>
  );
};

NavbarProfileLink.defaultProps = {};
NavbarProfileLink.propTypes = {};

export default NavbarProfileLink;

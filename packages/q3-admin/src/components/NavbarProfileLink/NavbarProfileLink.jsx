import React from 'react';
import { Link } from '@reach/router';
import { string } from 'q3-ui-helpers';
import {
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from '@material-ui/core';
import { AuthContext } from 'q3-ui-permissions';

const NavbarProfileLink = () => {
  const { state } = React.useContext(AuthContext);

  return (
    <ListItem button dense component={Link} to="account">
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
  );
};

NavbarProfileLink.defaultProps = {};
NavbarProfileLink.propTypes = {};

export default NavbarProfileLink;

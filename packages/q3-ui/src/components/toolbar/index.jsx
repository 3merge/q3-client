import React from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { blueGrey } from '@material-ui/core/colors';
import { styled } from '@material-ui/styles';

export const DropDownMenu = ({ id, children, items }) => {
  const [open, setOpen] = React.useState();
  const openMenu = React.useCallback(({ target }) => {
    setOpen(target);
  }, []);

  const closeMenu = React.useCallback(() => {
    setOpen(null);
  }, []);

  return (
    <>
      {children(openMenu)}
      <Menu
        id={id}
        anchorEl={open}
        open={Boolean(open)}
        keepMounted
        onClose={closeMenu}
        elevation={2}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        {items.map((item) => (
          <MenuItem
            dense
            key={item.label}
            onClick={item.onClick}
          >
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export const AccountMenu = ({
  isLoggedIn,
  profileImgSrc,
  name,
  items,
}) => {
  if (!isLoggedIn) {
    return (
      <Grid container spacing={1} justify="flex-end">
        <Grid item>
          <Button color="inherit">Signup</Button>
        </Grid>
        <Grid item>
          <Button color="inherit" variant="outlined">
            Login
          </Button>
        </Grid>
      </Grid>
    );
  }

  return (
    <DropDownMenu id="profile-dropdown" items={items}>
      {(toggle) =>
        name ? (
          <Button color="inherit" onClick={toggle}>
            {name}
            <KeyboardArrowDown
              style={{ marginRight: 16 }}
            />
            <Avatar alt={name} src={profileImgSrc} />
          </Button>
        ) : (
          <IconButton
            size="small"
            onClick={toggle}
            aria-label="Toggle menu"
          >
            <Avatar
              alt="Default profile picture"
              src={profileImgSrc}
            />
          </IconButton>
        )
      }
    </DropDownMenu>
  );
};

AccountMenu.propTypes = {
  name: PropTypes.string,
  profileImgSrc: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func,
      label: PropTypes.string,
    }),
  ),
};

AccountMenu.defaultProps = {
  name: null,
  profileImgSrc: null,
  items: [],
};

const Bar = styled(Toolbar)({
  backgroundColor: blueGrey[900],
  color: '#FFF',
  justifyContent: 'space-between',
});

const HorizontalMenu = styled('div')({
  display: 'flex',
  padding: 0,
  margin: 0,
  listStyle: 'none',
});

const SessionToolbar = ({ children, ...rest }) => (
  <Bar>
    <HorizontalMenu>{children}</HorizontalMenu>
    <AccountMenu {...rest} />
  </Bar>
);

SessionToolbar.propTypes = {
  children: PropTypes.node,
};

SessionToolbar.defaultProps = {
  children: null,
};

export default SessionToolbar;

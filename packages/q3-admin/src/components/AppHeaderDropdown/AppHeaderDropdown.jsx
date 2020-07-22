import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';

export const useOpen = () => {
  const [open, setOpen] = React.useState();

  const toggleMenu = () => setOpen(!open);

  const openMenu = React.useCallback(({ target }) => {
    setOpen(target);
  }, []);

  const closeMenu = React.useCallback(() => {
    setOpen(null);
  }, []);

  return {
    open,
    openMenu,
    closeMenu,
    toggleMenu,
  };
};

export const DropDownMenu = ({
  id,
  children,
  items,
  ...etc
}) => {
  const { open, openMenu, closeMenu } = useOpen();

  return (
    <>
      {children(openMenu, open)}
      <Menu
        id={id}
        anchorEl={open}
        getContentAnchorEl={null}
        open={Boolean(open)}
        onClose={closeMenu}
        elevation={5}
        {...etc}
      >
        {items.map((item) => (
          <MenuItem
            style={{ margin: 0 }}
            key={item.label}
            onClick={(e) => {
              item.onClick(e);
              closeMenu();
            }}
          >
            {item.element}
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export const AccountMenu = ({
  name,
  src,
  items,
  icon: Icon,
}) => {
  return Array.isArray(items) ? (
    <DropDownMenu id="profile-dropdown" items={items}>
      {(toggle) => (
        <IconButton onClick={toggle} color="inherit">
          {Icon ? (
            <Icon />
          ) : (
            <Avatar alt="Profile picture" src={src} />
          )}
        </IconButton>
      )}
    </DropDownMenu>
  ) : null;
};

AccountMenu.propTypes = {
  name: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func,
      label: PropTypes.string,
    }),
  ),
};

AccountMenu.defaultProps = {
  name: null,
  items: [],
};

export default AccountMenu;

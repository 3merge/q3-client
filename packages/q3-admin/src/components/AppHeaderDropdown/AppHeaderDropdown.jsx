import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import { useTranslation } from 'react-i18next';
import { isFunction, map } from 'lodash';

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
  const { t } = useTranslation('labels');

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
        {map(items, (item, i) =>
          item.divider ? (
            <Divider
              style={{ margin: '.5rem 0' }}
              component="li"
              key={i}
            />
          ) : (
            <li key={item.label}>
              <MenuItem
                {...(isFunction(item.onClick)
                  ? {
                      component: 'button',
                      onClick: (e) => {
                        item.onClick(e);
                        closeMenu();
                      },
                    }
                  : {
                      component: Link,
                      onClick: closeMenu,
                      to: item.to || '/',
                    })}
                style={{
                  margin: 0,
                  width: '100%',
                }}
              >
                {item.element}
                {t(item.label)}
              </MenuItem>
            </li>
          ),
        )}
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

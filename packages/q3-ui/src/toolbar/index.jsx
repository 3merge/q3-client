import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { useTranslation } from 'q3-ui-locale';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {
  styled,
  makeStyles,
} from '@material-ui/core/styles';
import astronaut from '../../images/astronaut.png';

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
  isLoggedIn,
  profileImgSrc,
  name = 'here',
  items,
  loginPath,
  signupPath,
}) => {
  const { t } = useTranslation();

  if (!isLoggedIn) {
    return (
      <Grid
        container
        spacing={1}
        justify="flex-end"
        wrap="nowrap"
      >
        <Hidden smDown>
          <Grid item>
            <Button
              component={Link}
              to={signupPath}
              color="inherit"
            >
              {t('labels:signup')}
            </Button>
          </Grid>
        </Hidden>
        <Grid item>
          <Button
            to={loginPath}
            component={Link}
            color="inherit"
            variant="outlined"
          >
            {t('labels:login')}
          </Button>
        </Grid>
      </Grid>
    );
  }

  return Array.isArray(items) ? (
    <DropDownMenu id="profile-dropdown" items={items}>
      {(toggle) =>
        name ? (
          <Button color="inherit" onClick={toggle}>
            {name}
            <KeyboardArrowDown style={{ marginRight: 8 }} />
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
  ) : null;
};

AccountMenu.propTypes = {
  name: PropTypes.node,
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
  profileImgSrc: astronaut,
  items: [],
};

const useStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: '#FFF',
    justifyContent: 'space-between',
  },
}));

const HorizontalMenu = styled('div')({
  display: 'flex',
  padding: 0,
  margin: 0,
  listStyle: 'none',
});

const SessionToolbar = ({ children, style, ...rest }) => {
  const { root } = useStyle();
  return (
    <Toolbar className={root} style={style}>
      <HorizontalMenu>{children}</HorizontalMenu>
      <AccountMenu {...rest} />
    </Toolbar>
  );
};

SessionToolbar.propTypes = {
  children: PropTypes.node,
  style: PropTypes.shape({
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
  }),
};

SessionToolbar.defaultProps = {
  children: null,
  style: null,
};

export default SessionToolbar;

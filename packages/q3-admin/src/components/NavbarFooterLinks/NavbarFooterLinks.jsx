import React from 'react';
import { Link } from '@reach/router';
import {
  List,
  ListItem,
  Link as MuiLink,
  Divider,
  Box,
} from '@material-ui/core';
import { useTranslation } from 'q3-ui-locale';
import { destroySession } from 'q3-ui-permissions';
import NavbarSystemLink from '../NavbarSystemLink';
import useStyle from './styles';

export const logout = (e) => {
  e.preventDefault();
  destroySession();
};

const NavbarFooterLinks = () => {
  const { t } = useTranslation('labels');
  const cls = useStyle();

  return (
    <Box my={2}>
      <List className={cls.root}>
        <ListItem>
          <MuiLink
            component={Link}
            to="account"
            label="profile"
          >
            {t('profile')}
          </MuiLink>
        </ListItem>
        <NavbarSystemLink />
        <ListItem>
          <MuiLink onClick={logout} href="#" role="button">
            {t('logout')}
          </MuiLink>
        </ListItem>
      </List>
    </Box>
  );
};

NavbarFooterLinks.defaultProps = {};
NavbarFooterLinks.propTypes = {};

export default NavbarFooterLinks;

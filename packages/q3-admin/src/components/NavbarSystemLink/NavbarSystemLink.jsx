import React from 'react';
import { Link } from '@reach/router';
import {
  Link as MuiLink,
  ListItem,
} from '@material-ui/core';
import { useTranslation } from 'q3-ui-locale';
import useDomainAuth from '../../hooks/useDomainAuth';

const NavbarSystemLink = () => {
  const { t } = useTranslation('labels');

  return useDomainAuth() ? (
    <ListItem>
      <MuiLink component={Link} to="system">
        {t('systemSettings')}
      </MuiLink>
    </ListItem>
  ) : null;
};

NavbarSystemLink.defaultProps = {};
NavbarSystemLink.propTypes = {};

export default NavbarSystemLink;

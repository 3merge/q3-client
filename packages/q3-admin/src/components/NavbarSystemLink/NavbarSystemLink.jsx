import React from 'react';
import { Link } from '@reach/router';
import {
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from '@material-ui/core';
import { useTranslation } from 'q3-ui-locale';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import useDomainContext from '../../hooks/useDomainContext';
import useStyle from './styles';

const NavbarSystemLink = () => {
  const cls = useStyle();
  const { t } = useTranslation('labels');
  const { domain = {} } = useDomainContext();
  const { brand, favicon } = domain;

  return (
    <ListItem button dense component={Link} to="system">
      <ListItemAvatar>
        <Avatar
          src={favicon}
          variant="rounded"
          className={cls.avatar}
        >
          <SettingsApplicationsIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={brand}
        secondary={t('systemSettings')}
      />
    </ListItem>
  );
};

NavbarSystemLink.defaultProps = {};
NavbarSystemLink.propTypes = {};

export default NavbarSystemLink;

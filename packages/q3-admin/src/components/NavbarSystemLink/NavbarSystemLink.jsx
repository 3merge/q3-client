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
import { useAuth } from 'q3-ui-permissions';
import useDomainContext from '../../hooks/useDomainContext';
import useStyle from './styles';

const NavbarSystemLink = () => {
  const cls = useStyle();
  const { t } = useTranslation('labels');
  const { domain = {} } = useDomainContext();
  const { brand, favicon } = domain;
  const domainAuth = useAuth('domain');
  const emailAuth = useAuth('emails');
  const queueAuth = useAuth('queues');

  if (
    // can always see for the most part
    !domainAuth.canCreate &&
    !emailAuth.canSee &&
    !queueAuth.canSee
  )
    return null;

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

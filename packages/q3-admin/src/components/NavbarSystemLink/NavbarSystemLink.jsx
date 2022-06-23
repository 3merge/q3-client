import React from 'react';
import { Link } from '@reach/router';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import useDomainAuth from '../../hooks/useDomainAuth';
import ButtonWithIcon from '../ButtonWithIcon';

const NavbarSystemLink = () =>
  useDomainAuth() ? (
    <ButtonWithIcon
      label="systemSettings"
      component={Link}
      to="system"
      icon={SettingsApplicationsIcon}
    />
  ) : null;

NavbarSystemLink.defaultProps = {};
NavbarSystemLink.propTypes = {};

export default NavbarSystemLink;

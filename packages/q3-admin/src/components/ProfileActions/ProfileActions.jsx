import React from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Notifications from '../../containers/Notifications';
import Documentation from '../Documentation';
import DeveloperTools from '../DeveloperTools';
import ProfileActionsDropdown from '../ProfileActionsDropdown';
import ThemeMode from '../ThemeMode';

const ProfileActions = ({
  DocumentationProps,
  includeDeveloperTools,
  includeDocumentation,
  includeNotifications,
  includeThemeMode,
  includeActionsDropdown,
}) => (
  <Box
    alignItems="center"
    display="flex"
    justifyContent="flex-end"
    minWidth={127}
  >
    {includeNotifications && <Notifications />}
    {includeDocumentation && (
      <Documentation {...DocumentationProps} />
    )}
    {includeThemeMode && <ThemeMode />}
    {includeDeveloperTools && <DeveloperTools />}
    {includeActionsDropdown && <ProfileActionsDropdown />}
  </Box>
);

ProfileActions.defaultProps = {
  DocumentationProps: {},
  includeDeveloperTools: true,
  includeDocumentation: true,
  includeNotifications: true,
  includeThemeMode: true,
  includeActionsDropdown: true,
};

ProfileActions.propTypes = {
  DocumentationProps: PropTypes.shape({
    id: PropTypes.number,
  }),
  includeDeveloperTools: PropTypes.bool,
  includeDocumentation: PropTypes.bool,
  includeNotifications: PropTypes.bool,
  includeThemeMode: PropTypes.bool,
  includeActionsDropdown: PropTypes.bool,
};

export default ProfileActions;

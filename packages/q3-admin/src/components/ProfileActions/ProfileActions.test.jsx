import React from 'react';
import ProfileActions from './ProfileActions';
import Notifications from '../../containers/Notifications';
import Documentation from '../Documentation';
import ProfileActionsDropdown from '../ProfileActionsDropdown';
import ThemeMode from '../ThemeMode';

const actionList = [
  Notifications,
  Documentation,
  ProfileActionsDropdown,
  ThemeMode,
];

const forEachAction = (props, callback) => {
  const el = global.shallow(<ProfileActions {...props} />);
  actionList.forEach((action) => {
    callback(el.find(action).exists());
  });
};

describe('ProfileActions', () => {
  it('should include all components', () => {
    forEachAction({}, (result) =>
      expect(result).toBeTruthy(),
    );
  });

  it('should exclude all components', () => {
    forEachAction(
      {
        includeDocumentation: false,
        includeNotifications: false,
        includeThemeMode: false,
        includeActionsDropdown: false,
      },
      (result) => expect(result).toBeFalsy(),
    );
  });
});

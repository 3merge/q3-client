import React from 'react';
import NotificationsPausedIcon from '@material-ui/icons/NotificationsPaused';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import Bell, { CustomBadge } from './Bell';

const checkActiveState = (expectedIconNode, isActive) => {
  const el = global.shallow(<Bell active={isActive} />);

  expect(el.find(CustomBadge).props()).toHaveProperty(
    'showZero',
    isActive,
  );

  return expect(el.find(expectedIconNode)).toHaveLength(1);
};

describe('Bell', () => {
  it('should render ActiveIcon', () =>
    checkActiveState(NotificationsActiveIcon, true));

  it('should render PausedIcon', () =>
    checkActiveState(NotificationsPausedIcon, false));
});

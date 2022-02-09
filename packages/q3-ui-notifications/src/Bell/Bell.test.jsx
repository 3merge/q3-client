import React from 'react';
import NotificationsPausedIcon from '@material-ui/icons/NotificationsPaused';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { exists } from 'q3-ui-test-utils/lib/enzymeUtils';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import Bell from './Bell';

describe('Bell', () => {
  it('should render ActiveIcon', () =>
    exists(
      global
        .shallow(<Bell active />)
        .find(NotificationsActiveIcon),
    ));

  it('should render PausedIcon', () =>
    exists(
      global
        .shallow(<Bell active={false} />)
        .find(NotificationsPausedIcon),
    ));

  it('should render OffIcon', () =>
    exists(
      global
        .shallow(<Bell error />)
        .find(NotificationsOffIcon),
    ));

  it('should render ActiveIcon', () =>
    exists(
      global
        .shallow(<Bell active hasItems />)
        .find(NotificationsIcon),
    ));
});

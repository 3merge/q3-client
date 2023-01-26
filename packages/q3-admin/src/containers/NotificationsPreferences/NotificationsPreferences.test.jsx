import React from 'react';
import { Form } from 'q3-ui-forms/lib/builders';
import {
  exists,
  doesNotExist,
} from 'q3-ui-test-utils/lib/enzymeUtils';
import NotificationsPreferences from './NotificationsPreferences';
import useProfileNotifications from '../../hooks/useProfileNotifications';
import Tabs from '../../components/Tabs';

jest.mock('../../hooks/useProfileNotifications');
jest.mock(
  '../../hooks/useProfileNotificationsLegacySync',
  () => jest.fn().mockReturnValue(true),
);

describe('NotificationsPreferences', () => {
  it('should disable', () => {
    useProfileNotifications.mockReturnValue({});

    doesNotExist(
      global
        .shallow(<NotificationsPreferences />)
        .find(Form),
    );
  });

  it('should display tabs', () => {
    useProfileNotifications.mockReturnValue({});
    exists(
      global
        .shallow(
          <NotificationsPreferences channels={['email']} />,
        )
        .find(Tabs),
    );
  });
});

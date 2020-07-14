import React from 'react';
import Popover from '../Popover';
import NotificationLink from '../NotificationLink';
import NotificationReadOnly from '../NotificationReadOnly';
import Notifications, {
  isLink,
  hasActiveNotifications,
} from './Notifications';

jest.unmock('useful-state');

describe('Notifications', () => {
  describe('"isLink"', () => {
    it('should return truthy when seen but undownloaded', () =>
      expect(
        isLink({ hasBeenDownloaded: false }),
      ).toBeTruthy());
  });

  describe('"hasActiveNotifications"', () => {
    const checkActive = (stub) =>
      expect(hasActiveNotifications([stub]));

    it('should return truthy when seen but not downloaded', () =>
      checkActive({
        hasBeenDownloaded: false,
        hasSeen: true,
      }).toBeTruthy());

    it('should return truthy when unseen', () =>
      checkActive({
        hasSeen: false,
      }).toBeTruthy());

    it('should return falsy when seen and downloaded', () =>
      checkActive({
        hasSeen: true,
        hasBeenDownloaded: true,
      }).toBeFalsy());

    it('should return falsy when unseen but undownloadable', () =>
      checkActive({
        hasSeen: true,
      }).toBeFalsy());
  });

  describe('Notifications', () => {
    it('should render messages and links', () => {
      const el = global.shallow(
        <Notifications
          data={[
            { hasSeen: true, label: 'foo' },
            {
              hasSeen: false,
              hasBeenDownloaded: false,
              label: 'bar',
            },
          ]}
        />,
      );

      const contents = el.find(Popover).dive();

      const hasType = (El) =>
        expect(contents.find(El)).toHaveLength(1);

      hasType(NotificationLink);
      hasType(NotificationReadOnly);
    });
  });
});

import React from 'react';
import Popover from '../Popover';
import NotificationLink from '../NotificationLink';
import NotificationReadOnly from '../NotificationReadOnly';
import Notifications, { isLink } from './Notifications';

jest.unmock('useful-state');

describe('Notifications', () => {
  describe('"isLink"', () => {
    it('should return truthy when seen but undownloaded', () =>
      expect(
        isLink({ url: 'https://google.ca' }),
      ).toBeTruthy());
  });

  describe('Notifications', () => {
    it('should render messages and links', () => {
      const el = global.shallow(
        <Notifications
          data={[
            { hasSeen: true, label: 'foo' },
            {
              url: 'http://google.ca/',
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

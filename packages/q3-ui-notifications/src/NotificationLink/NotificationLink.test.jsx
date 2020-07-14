import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import NotificationLink from './NotificationLink';

function check(el) {
  return {
    selectedValue(expectedValue) {
      expect(el.find(ListItem).props()).toHaveProperty(
        'selected',
        expectedValue,
      );

      return this;
    },

    clickValue(expectedValue) {
      expect(
        el.find(ListItemText).props().secondary.props,
      ).toHaveProperty('onClick', expectedValue);

      return this;
    },
  };
}

describe('NotificationLink', () => {
  it('should register click hanlder', () => {
    const el = global.shallow(
      <NotificationLink
        url="https://google.ca"
        label="File"
        onClick={jest.fn()}
        hasBeenDownloaded={false}
      />,
    );

    check(el)
      .selectedValue(true)
      .clickValue(expect.any(Function));
  });

  it('should remove click hanlder', () => {
    const el = global.shallow(
      <NotificationLink
        url="https://google.ca"
        label="File"
        onClick={jest.fn()}
        hasBeenDownloaded
      />,
    );

    check(el).selectedValue(false).clickValue(undefined);
  });
});

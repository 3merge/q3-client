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
      const { onClick } = el
        .find(ListItemText)
        .props().secondary.props;

      expect(onClick).toEqual(expectedValue);
      return this;
    },
  };
}

describe('NotificationLink', () => {
  it('should register click hanlder', () => {
    const el = global.shallow(
      <NotificationLink
        id="link"
        url="https://google.ca"
        label="File"
        onClick={jest.fn()}
        hasDownloaded={false}
      />,
    );

    check(el)
      .selectedValue(true)
      .clickValue(expect.any(Function));
  });

  it('should remove click hanlder', () => {
    const el = global.shallow(
      <NotificationLink
        id="link"
        url="https://google.ca"
        label="File"
        onClick={jest.fn()}
        hasDownloaded
      />,
    );

    check(el).selectedValue(false).clickValue(undefined);
  });
});

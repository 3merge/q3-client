import React from 'react';
import { invoke } from 'lodash';
import ListItem from '@material-ui/core/ListItem';
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

    clickValue(fn, method) {
      window.open = jest.fn();
      const { onClick } = el.find(ListItem).props();
      return onClick().then(() => {
        expect(window.open).toHaveBeenCalled();
        // eslint-disable-next-line
        invoke(expect(fn), method);
      });
    },
  };
}

describe('NotificationLink', () => {
  it('should register click hanlder', () => {
    const onClick = jest.fn();
    const el = global.shallow(
      <NotificationLink
        id="link"
        url="https://google.ca"
        label="File"
        onClick={onClick}
        hasDownloaded={false}
      />,
    );

    return check(el)
      .selectedValue(true)
      .clickValue(onClick, 'toHaveBeenCalled');
  });

  it('should remove click hanlder', () => {
    const onClick = jest.fn();
    const el = global.shallow(
      <NotificationLink
        id="link"
        url="https://google.ca"
        label="File"
        onClick={onClick}
        hasDownloaded
      />,
    );

    return check(el)
      .selectedValue(false)
      .clickValue(onClick, 'not.toHaveBeenCalled');
  });
});

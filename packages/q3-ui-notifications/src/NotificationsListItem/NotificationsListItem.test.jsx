import React from 'react';
import { ListItemText } from '@material-ui/core';
import NotificationsListItem from './NotificationsListItem';
import NotificationsListItemLink from '../NotificationsListItemLink';
import NotificationsListItemMessage from '../NotificationsListItemMessage';

const d = new Date().toISOString();

describe('NotificationsListItem', () => {
  it('should assign default download text', () => {
    expect(
      global
        .shallow(
          <NotificationsListItem
            id="1"
            label="foo"
            createdAt={d}
            url="https://google.ca"
            onClick={jest.fn()}
          />,
        )
        .find(ListItemText)
        .prop('primary'),
    ).toMatch('newDownloadAvailable');
  });

  it('should use label', () => {
    expect(
      global
        .shallow(
          <NotificationsListItem
            id="1"
            label="foo"
            createdAt={d}
            onClick={jest.fn()}
          />,
        )
        .find(ListItemText)
        .prop('primary'),
    ).toMatch('foo');
  });

  it('should ignore label', () => {
    expect(
      global
        .shallow(
          <NotificationsListItem
            id="1"
            label="file/path"
            createdAt={d}
            onClick={jest.fn()}
            messageType="download"
          />,
        )
        .find(ListItemText)
        .prop('primary'),
    ).toMatch('newDownloadAvailable');
  });

  it('should render NotificationsListItemLink', () => {
    expect(
      global
        .shallow(
          <NotificationsListItem
            id="1"
            createdAt={d}
            onClick={jest.fn()}
          >
            <div />
          </NotificationsListItem>,
        )
        .find(NotificationsListItemLink)
        .exists(),
    ).toBeTruthy();
  });

  it('should render NotificationsListItemMessage', () => {
    expect(
      global
        .shallow(
          <NotificationsListItem
            id="1"
            acknowledge={jest.fn()}
            createdAt={d}
          >
            <div />
          </NotificationsListItem>,
        )
        .find(NotificationsListItemMessage)
        .exists(),
    ).toBeTruthy();
  });
});

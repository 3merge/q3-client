import React from 'react';
import moment from 'moment';
import { List, Divider } from '@material-ui/core';
import { string } from 'q3-ui-helpers';
import NotificationsListItem from '../NotificationsListItem';
import {
  NotificationsList,
  mapDataByCreatedDate,
} from './NotificationsList';

describe('mapDataByCreatedDate', () => {
  it('should group by created date', () => {
    const createdAt = moment().toISOString();
    const out = mapDataByCreatedDate([{ createdAt }]);

    expect(out).toHaveProperty(
      string.toDayOfWeek(createdAt),
      expect.any(Array),
    );
  });

  it('should return null for empty lists', () => {
    const out = mapDataByCreatedDate([]);
    expect(out).toBeNull();
  });
});

describe('NotificationsList', () => {
  it('should render data into list', () => {
    const t = moment();

    const el = global.shallow(
      <NotificationsList
        data={[
          {
            createdAt: moment().subtract(2, 'day').toDate(),
          },
          { createdAt: t.toDate() },
          { createdAt: t.toDate() },
        ]}
      />,
    );

    expect(el.find(List)).toHaveLength(2);
    expect(el.find(NotificationsListItem)).toHaveLength(3);
    expect(el.find(Divider)).toHaveLength(1);
  });
});

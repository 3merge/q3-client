import React from 'react';
import {
  List,
  ListSubheader,
  Divider,
} from '@material-ui/core';
import { string } from 'q3-ui-helpers';
import {
  map,
  groupBy,
  size,
  isObject,
  orderBy,
} from 'lodash';
import NotificationsDescription from '../NotificationsDescription';
import NotificationsListItem from '../NotificationsListItem';
import withLoadingState from '../withLoadingState';

export const mapDataByCreatedDate = (xs) => {
  if (!size(xs)) return null;

  const mapped = map(xs, (notification) => ({
    ...notification,
    day: string.toDayOfWeek(notification.createdAt),
  }));

  return groupBy(
    orderBy(mapped, ['createdAt'], ['desc']),
    'day',
  );
};

export const NotificationsList = ({
  // eslint-disable-next-line
  data: rawData,
}) => {
  const data = mapDataByCreatedDate(rawData);

  return isObject(data) ? (
    Object.entries(data).map(([key, values, idx]) =>
      size(values) ? (
        <List
          key={key || idx}
          subheader={
            <ListSubheader
              disableSticky
              style={{ paddingLeft: 24, paddingRight: 24 }}
            >
              {key}
            </ListSubheader>
          }
        >
          {map(values, (item, i) => (
            <>
              <NotificationsListItem
                key={item.id || i}
                {...item}
              />
              {i !== values.length - 1 && (
                <Divider component="li" />
              )}
            </>
          ))}
        </List>
      ) : null,
    )
  ) : (
    <NotificationsDescription text="notificationsEmpty" />
  );
};

export default withLoadingState(NotificationsList);

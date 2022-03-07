import React from 'react';
import {
  List,
  ListSubheader,
  Divider,
  Typography,
  Box,
} from '@material-ui/core';
import { string } from 'q3-ui-helpers';
import {
  map,
  groupBy,
  size,
  isObject,
  orderBy,
} from 'lodash';
import { useTranslation } from 'q3-ui-locale';
import NotificationsListItem from '../NotificationsListItem';
import withUnseenNotifications from '../withUnseenNotificationsOnly';

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

// eslint-disable-next-line
export const NotificationsList = ({ data: rawData }) => {
  const data = mapDataByCreatedDate(rawData);
  const { t } = useTranslation('descriptions');

  return isObject(data) ? (
    Object.entries(data).map(([key, values, idx]) =>
      size(values) ? (
        <List
          key={key || idx}
          subheader={<ListSubheader>{key}</ListSubheader>}
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
    <Box py={1} px={2}>
      <Typography>{t('notificationSettings')}</Typography>
    </Box>
  );
};

export default withUnseenNotifications(NotificationsList);

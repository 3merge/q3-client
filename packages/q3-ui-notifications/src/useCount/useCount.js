import { filter, size, some } from 'lodash';

const isNew = (item) =>
  !item.hasDownloaded && !item.hasSeen;

export default (notifications) => ({
  active: some(notifications, isNew),
  hasItems: size(notifications) > 0,
  numberOfNotificationsTotal: size(notifications),
  numberOfNotifications: size(filter(notifications, isNew)),
});

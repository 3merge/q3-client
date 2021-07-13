import { size, some } from 'lodash';

export default (notifications) => ({
  active: some(
    notifications,
    // neither of message nor download that has been reached
    (item) => !item.hasDownloaded && !item.hasSeen,
  ),

  hasItems: size(notifications) > 0,
});

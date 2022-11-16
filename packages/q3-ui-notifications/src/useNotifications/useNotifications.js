import { split } from 'lodash';
import { useInfiniteScroll } from 'q3-ui-rest';
import useNotificationsPolling from '../useNotificationsPolling';
import useViews from '../useViews';

const useNotifications = (view) => {
  const location = useViews(view);

  const {
    fetching,
    fetchingError,
    hasNextPage,
    notifications,
    patch,
    poll,
    patchBulk,
    remove,
    removeBulk,
    replace,
  } = useNotificationsPolling(location);

  const markAsInactiveInsideState = (ids) =>
    replace({
      notifications: (Array.isArray(ids)
        ? ids
        : split(ids, ',')
      ).map((id) => ({
        id,
        active: false,
      })),
    });

  return {
    ...useInfiniteScroll({
      data: notifications,
      hasNextPage,
      location,
      poll,
    }),

    fetching,
    fetchingError,

    bulkArchiveByIds(ids) {
      return patchBulk(ids)({
        archived: true,
      });
    },

    bulkUnarchiveByIds(ids) {
      return patchBulk(ids)({
        archived: false,
      });
    },

    bulkReadByIds(ids) {
      return patchBulk(ids)({
        read: true,
      });
    },

    bulkRemoveByIds(ids) {
      return removeBulk(ids)().then((resp) => {
        markAsInactiveInsideState(ids);
        return resp;
      });
    },

    bulkUnreadByIds(ids) {
      return patchBulk(ids)({
        read: false,
      });
    },

    delete(id) {
      return remove(id)().then((resp) => {
        markAsInactiveInsideState(id);
        return resp;
      });
    },

    updateToArchived(id) {
      return patch(id)({
        archived: true,
      });
    },

    updateToRead(id) {
      return patch(id)({
        read: true,
      });
    },

    updateToUnarchived(id) {
      return patch(id)({
        archived: false,
      });
    },

    updateToUnread(id) {
      return patch(id)({
        read: false,
      });
    },
  };
};

export default useNotifications;

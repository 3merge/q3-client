import { useInfiniteScroll } from 'q3-ui-rest';
import useNotificationsPolling from '../useNotificationsPolling';
import useNotificationsRefresh from '../useNotificationsRefresh';
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
    removeBulk,
  } = useNotificationsPolling(location);

  const { data: infiniteData, ...infiniteScroll } =
    useInfiniteScroll({
      data: notifications,
      hasNextPage,
      location,
      poll,
    });

  const { refresh, ...refreshedData } =
    useNotificationsRefresh(infiniteData);

  return {
    ...infiniteScroll,
    ...refreshedData,

    fetching,
    fetchingError,

    bulkArchiveByIds(ids) {
      return patchBulk(
        ids,
        refresh,
      )({
        archived: true,
      });
    },

    bulkUnarchiveByIds(ids) {
      return patchBulk(
        ids,
        refresh,
      )({
        archived: false,
      });
    },

    bulkReadByIds(ids) {
      return patchBulk(
        ids,
        refresh,
      )({
        read: true,
      });
    },

    bulkRemoveByIds(ids) {
      return removeBulk(
        ids,
        refresh,
      )({
        archived: true,
      });
    },

    bulkUnreadByIds(ids) {
      return patchBulk(
        ids,
        refresh,
      )({
        read: false,
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

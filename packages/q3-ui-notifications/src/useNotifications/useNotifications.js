import React from 'react';
import { split, uniq, concat } from 'lodash';
import { useInfiniteScroll } from 'q3-ui-rest';
import useNotificationsPolling from '../useNotificationsPolling';
import useNotificationsRefresh from '../useNotificationsRefresh';
import useViews from '../useViews';

const useNotifications = (view) => {
  const location = useViews(view);
  const [deleted, setDeleted] = React.useState([]);

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
  } = useNotificationsPolling(location);

  const reconciledData = React.useMemo(
    () => concat(notifications, deleted),
    [notifications, deleted],
  );

  const { data: infiniteData, ...infiniteScroll } =
    useInfiniteScroll({
      data: reconciledData,
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
      return removeBulk(ids, refresh)().then((resp) => {
        setDeleted((prev) =>
          uniq(
            prev.concat(
              (Array.isArray(ids)
                ? ids
                : split(ids, ',')
              ).map((id) => ({
                id,
                active: false,
              })),
            ),
          ),
        );

        return resp;
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

    delete(id) {
      return remove(id)().then((resp) => {
        setDeleted((prev) =>
          prev.concat({
            id,
            active: false,
          }),
        );

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

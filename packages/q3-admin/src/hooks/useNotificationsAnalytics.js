import React from 'react';
import axios from 'axios';
import { array, browser, object } from 'q3-ui-helpers';
import { join, isFunction, compact } from 'lodash';
import { Store } from '../containers/state';

export const NOTIFICATION_ANALYTICS_ENDPOINT =
  'system-notifications-analytics';

export const parseArray = (xs) => {
  try {
    return array.is(JSON.parse(xs));
  } catch (e) {
    return [];
  }
};

export const checkLocalStorage = (
  body,
  maximumArrayLength = 100000,
) => {
  const resp = parseArray(
    browser.proxyLocalStorageApi(
      'getItem',
      NOTIFICATION_ANALYTICS_ENDPOINT,
    ),
  );

  if (
    resp.find(
      (item) =>
        String(item.documentId) ===
          String(body.documentId) &&
        String(item.subDocumentId) ===
          String(body.subDocumentId),
    )
  )
    return true;

  const storageState = resp.concat(body);

  if (storageState.length > maximumArrayLength) {
    storageState.shift();
  }

  browser.proxyLocalStorageApi(
    'setItem',
    NOTIFICATION_ANALYTICS_ENDPOINT,
    object.toJSON(storageState),
  );

  return false;
};

const useNotificationsAnalytics = (getSubDocumentIds) => {
  const { data } = React.useContext(Store);
  const documentId = data?.id;

  // in cases where it becomes unread, read and back to unread
  const read = data?.read;

  React.useLayoutEffect(() => {
    // usually in an error or loading state
    if (!documentId) return undefined;

    const controller = new AbortController();
    const timer = setTimeout(() => {
      const body = {
        documentId,
        subDocumentId: isFunction(getSubDocumentIds)
          ? join(compact(getSubDocumentIds(data)), ',')
          : undefined,
      };

      if (!checkLocalStorage(body) || read === false)
        object.noop(
          axios.post(
            `/${NOTIFICATION_ANALYTICS_ENDPOINT}`,
            body,
            { signal: controller.signal },
          ),
        );
    }, 500);

    return () => {
      if (timer) window.clearTimeout(timer);
      controller.abort();
    };
  }, [documentId, read]);
};

export default useNotificationsAnalytics;

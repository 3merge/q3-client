import React from 'react';
import axios from 'axios';
import { object } from 'q3-ui-helpers';
import { join, isFunction, compact } from 'lodash';
import { Store } from '../containers/state';

const useNotificationsAnalytics = (getSubDocumentIds) => {
  const { data } = React.useContext(Store);
  const documentId = data?.id;

  React.useLayoutEffect(() => {
    // usually in an error or loading state
    if (!documentId) return undefined;

    const controller = new AbortController();
    const timer = setTimeout(() => {
      object.noop(
        axios.post(
          '/system-notifications-analytics',
          {
            documentId,
            subDocumentId: isFunction(getSubDocumentIds)
              ? join(compact(getSubDocumentIds(data)), ',')
              : undefined,
          },
          {
            signal: controller.signal,
          },
        ),
      );
    }, 500);

    return () => {
      if (timer) window.clearTimeout(timer);
      controller.abort();
    };
  }, [documentId]);
};

export default useNotificationsAnalytics;

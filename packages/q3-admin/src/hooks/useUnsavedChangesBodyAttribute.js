import React from 'react';
import { browser } from 'q3-ui-helpers';
import {
  addDocumentListener,
  removeDocumentListener,
} from './useNotificationsEvent';

const EVENT_NAME = 'q3-change-detection';

export const setAttribute = (xs) =>
  browser.proxySessionStorageApi(
    'setItem',
    EVENT_NAME,
    String(xs),
  );

export const getAttribute = () =>
  browser.proxySessionStorageApi('getItem', EVENT_NAME) ===
  'true';

export const useUnsavedChangesBodyAttribute = () => {
  const handleEvent = (e) => setAttribute(!e?.data);

  React.useEffect(() => {
    addDocumentListener(EVENT_NAME, handleEvent);

    return () => {
      setAttribute(false);
      removeDocumentListener(EVENT_NAME, handleEvent);
    };
  }, []);
};

export default useUnsavedChangesBodyAttribute;

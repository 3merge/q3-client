import React from 'react';
import { debounce, invoke } from 'lodash';
import { browser } from 'q3-ui-helpers';
import {
  CHANGE,
  CONNECT,
  ERROR,
  makeEventName,
} from './useServerSideEvents';

export const addDocumentListener = (eventName, fn) => {
  if (!browser.isBrowserReady()) return;

  invoke(document, 'addEventListener', eventName, fn, {
    passive: true,
  });
};

export const removeDocumentListener = (eventName, fn) => {
  if (!browser.isBrowserReady()) return;
  invoke(document, 'removeEventListener', eventName, fn);
};

export default (getData, { onConnect, onError }) => {
  const onChange = debounce(getData, 5000);

  React.useEffect(() => {
    const general = makeEventName();
    const noti = makeEventName('q3-api-notifications');

    const handleGeneral = (event) => {
      const { action } = event.data;
      if (action === CONNECT) onConnect();
      if (action === ERROR) onError();
    };

    const handleNoti = (event) => {
      const { action } = event.data;
      if (action === CHANGE) {
        onConnect();
        onChange();
      }
    };

    addDocumentListener(noti, handleNoti);
    addDocumentListener(general, handleGeneral);
    getData();

    return () => {
      removeDocumentListener(general, handleGeneral);
      removeDocumentListener(noti, handleNoti);
    };
  }, []);
};

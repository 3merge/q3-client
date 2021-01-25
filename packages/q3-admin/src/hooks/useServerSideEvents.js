import React from 'react';
import axios from 'axios';
import { browser } from 'q3-ui-helpers';

const EVENT_NAME = 'q3-change-stream';
export const CONNECT = 'CONNECT';
export const CHANGE = 'CHANGE';
export const ERROR = 'ERROR';

export const makeEventName = (collection) =>
  collection ? `${EVENT_NAME}-${collection}` : EVENT_NAME;

export const sendChangeStreamEvent = (data) => {
  if (!browser.isBrowserReady()) return;
  const event = new Event(makeEventName(data.collection));
  event.data = data;
  document.dispatchEvent(event);
};

export default () => {
  React.useEffect(() => {
    const eventSource = new EventSource(
      [
        axios?.defaults?.baseURL || '//localhost',
        'stream',
      ].join(''),
    );

    eventSource.onmessage = (e) =>
      sendChangeStreamEvent({
        ...JSON.parse(e.data),
        action: CHANGE,
      });

    eventSource.onopen = () =>
      sendChangeStreamEvent({
        action: CONNECT,
      });

    eventSource.onerror = () =>
      sendChangeStreamEvent({
        action: ERROR,
      });

    return () => {
      eventSource.close();
    };
  }, []);
};

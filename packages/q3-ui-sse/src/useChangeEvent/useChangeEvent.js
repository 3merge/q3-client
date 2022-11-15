import { browser } from 'q3-ui-helpers';
import { invoke } from 'lodash';
import { EVENT_NAME_PREFIX } from '../constants';

export const checkBrowser =
  (fn) =>
  (...args) =>
    browser.isBrowserReady() ? fn(...args) : undefined;

export const makeEventName = (str) =>
  str ? `${EVENT_NAME_PREFIX}-${str}` : EVENT_NAME_PREFIX;

const useChangeEvent = (suffix) => {
  const eventName = makeEventName(suffix);

  const attach = checkBrowser((fn) => {
    invoke(document, 'addEventListener', eventName, fn, {
      passive: true,
    });
  });

  const detach = checkBrowser((fn) => {
    invoke(document, 'removeEventListener', eventName, fn);
  });

  const dispatch = checkBrowser((data) => {
    // allows us to simulate event for collections
    // if ever needed
    const name = suffix
      ? eventName
      : makeEventName(data.collection);

    const event = new Event(name);
    event.data = data;
    document.dispatchEvent(event);
  });

  return {
    attach,
    detach,
    dispatch,
    eventName,
  };
};

export default useChangeEvent;

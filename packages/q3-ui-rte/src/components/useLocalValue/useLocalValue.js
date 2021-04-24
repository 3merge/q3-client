import React from 'react';
import { browser } from 'q3-ui-helpers';

const makeLocalStorageKey = (id) => `q3-rte-${id}`;

const removeFromLocalStorage = (id) =>
  id
    ? browser.proxyLocalStorageApi(
        'removeItem',
        makeLocalStorageKey(id),
      )
    : undefined;

const getFromLocalStorage = (id) => () =>
  id
    ? browser.proxyLocalStorageApi(
        'getItem',
        makeLocalStorageKey(id),
      )
    : undefined;

export default (ref, { id, defaultValue }) => {
  const editor = ref?.current?.root;
  const timer = React.useRef();

  const stopAutoSave = () => {
    if (timer.current) clearInterval(timer.current);
  };

  const saveChangesToLocalStorage = () => {
    const html = ref?.current?.root?.innerHTML;

    if (html && html !== '<p><br></p>')
      browser.proxyLocalStorageApi(
        'setItem',
        makeLocalStorageKey(id),
        html,
      );
  };

  React.useEffect(() => {
    timer.current = setInterval(() => {
      saveChangesToLocalStorage();
    }, 10000);

    return stopAutoSave;
  }, [editor]);

  const get = getFromLocalStorage(id);

  return {
    get,
    remove: () => {
      removeFromLocalStorage(id);
      stopAutoSave();
    },
    value: get() || defaultValue,
    stopAutoSave,
  };
};

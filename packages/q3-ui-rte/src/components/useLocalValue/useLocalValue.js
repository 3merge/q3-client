import React from 'react';
import { browser } from 'q3-ui-helpers';
import { debounce, isFunction } from 'lodash';

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

export default (ref, { id, defaultValue, onChange }) => {
  const editor = ref?.current?.root;
  const timer = React.useRef();

  const getCurrentState = () =>
    ref?.current?.root?.innerHTML;

  const stopAutoSave = () => {
    if (timer.current) clearInterval(timer.current);
  };

  const saveChangesToLocalStorage = () => {
    const html = getCurrentState();

    if (html && html !== '<p><br></p>')
      browser.proxyLocalStorageApi(
        'setItem',
        makeLocalStorageKey(id),
        html,
      );
  };

  React.useEffect(() => {
    if (!isFunction(onChange))
      timer.current = setInterval(() => {
        saveChangesToLocalStorage();
      }, 10000);

    return stopAutoSave;
  }, [editor]);

  React.useEffect(() => {
    if (!ref?.current?.root || !isFunction(onChange))
      return undefined;

    const observer = new MutationObserver(
      debounce(() => {
        onChange(getCurrentState());
      }, 150),
    );

    observer.observe(ref.current.root, {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const get = getFromLocalStorage(id);

  return {
    get,
    getCurrentState,
    remove: () => {
      removeFromLocalStorage(id);
      stopAutoSave();
    },
    value: defaultValue || get(),
    stopAutoSave,
  };
};

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

export default (
  ref,
  {
    autosave,
    autosaveInterval = 10000,
    id,
    defaultValue,
    onChange,
  },
) => {
  const editor = ref?.current?.root;
  const timer = React.useRef();

  const get = getFromLocalStorage(id);
  const value = autosave
    ? get() || defaultValue
    : defaultValue || get();

  const isNotEmptyHtml = (html) =>
    html && html !== '<p><br></p>';

  const getCurrentState = () =>
    ref?.current?.root?.innerHTML || value;

  const callOnChange = () => {
    const html = getCurrentState();
    onChange(isNotEmptyHtml(html) ? html : '');
  };

  const stopAutoSave = () => {
    if (timer.current) clearInterval(timer.current);
  };

  const saveChangesToLocalStorage = () => {
    const html = getCurrentState();

    if (isNotEmptyHtml(html))
      browser.proxyLocalStorageApi(
        'setItem',
        makeLocalStorageKey(id),
        html,
      );
    else removeFromLocalStorage(id);
  };

  React.useEffect(() => {
    if (!isFunction(onChange) || autosave)
      timer.current = setInterval(() => {
        saveChangesToLocalStorage();
      }, autosaveInterval);

    return stopAutoSave;
  }, [editor, autosaveInterval]);

  React.useEffect(() => {
    if (!ref?.current?.root || !isFunction(onChange))
      return undefined;

    callOnChange();

    const observer = new MutationObserver(
      debounce(callOnChange, 150),
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

  return {
    get,
    getCurrentState,
    remove: () => {
      removeFromLocalStorage(id);
      stopAutoSave();
    },
    value,
    stopAutoSave,
  };
};

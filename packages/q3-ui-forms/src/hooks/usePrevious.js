import React from 'react';
import { browser } from 'q3-ui-helpers';

const SESSION_STORAGE_EVENT = 'storage';

const dispatch = (dirty) => {
  if (browser.isBrowserReady())
    window.dispatchEvent(
      new CustomEvent(SESSION_STORAGE_EVENT, {
        detail: {
          dirty,
        },
      }),
    );
};

export const listenForChange = () => {
  const [
    unsavedChanges,
    setUnsavedChanges,
  ] = React.useState(false);

  const eventHandler = ({ detail: { dirty } }) =>
    setUnsavedChanges(dirty);

  React.useEffect(() => {
    if (!browser.isBrowserReady()) return undefined;

    window.addEventListener(
      SESSION_STORAGE_EVENT,
      eventHandler,
    );

    return () =>
      window.removeEventListener(
        SESSION_STORAGE_EVENT,
        eventHandler,
      );
  }, []);

  return unsavedChanges;
};

export const usePreviousRef = (value, onClear) => {
  const ref = React.useRef();
  const isModified = ref.current
    ? JSON.stringify(ref.current) !== JSON.stringify(value)
    : false;

  const clear = () => {
    ref.current = value;
    if (onClear) onClear();
  };

  React.useEffect(() => {
    clear();
  }, []);

  return {
    prev: ref.current,
    clear,
    isModified,
  };
};

export default (value) => {
  const out = usePreviousRef(value, () => {
    dispatch(false);
  });

  const { isModified } = out;

  React.useEffect(() => {
    dispatch(isModified);

    return () => {
      dispatch(false);
    };
  }, [isModified]);

  return out;
};

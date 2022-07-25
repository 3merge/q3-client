import React from 'react';
import { browser } from 'q3-ui-helpers';
import FileManagerBatchContext from '../FileManagerBatchContext';
import { checkSsr } from '../utils';

const useDialog = (dialogId, args = {}) => {
  const [data, setData] = React.useState(null);
  const { enable, disable } = React.useContext(
    FileManagerBatchContext,
  );

  const attr = 'data-props';

  const getElement = () =>
    document.getElementById(dialogId);

  const setAttribute = (value) => {
    const el = getElement();
    el.setAttribute(attr, value);
    return el;
  };

  const open = checkSsr(() => {
    setAttribute(JSON.stringify(args)).click();
  });

  const close = checkSsr(() => {
    setAttribute('');
  });

  const handleAttribute = (el) => {
    try {
      setData(JSON.parse(el.getAttribute(attr)));
    } catch (e) {
      setData(null);
    }
  };

  const handleOpen = (ev, next) => {
    handleAttribute(getElement());
    next();
  };

  React.useEffect(() => {
    if (!browser.isBrowserReady()) return undefined;
    const observer = new MutationObserver(
      ([{ target }]) => {
        handleAttribute(target);
      },
    );

    const el = document.getElementById(dialogId);
    if (!el || !(el instanceof Node)) return undefined;

    observer.observe(el, {
      attributes: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return {
    close,
    data,
    handleOpen,
    open,
    isOpen: Boolean(data),
    TransitionProps: {
      onEnter() {
        disable();
      },
      onExit() {
        enable();
      },
    },
  };
};

export default useDialog;

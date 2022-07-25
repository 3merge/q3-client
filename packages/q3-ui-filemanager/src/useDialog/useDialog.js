import React from 'react';
import FileManagerBatchContext from '../FileManagerBatchContext';
import { checkSsr } from '../utils';

const useDialog = (dialogId, args = {}) => {
  const [data, setData] = React.useState(null);
  const { enable, disable } = React.useContext(
    FileManagerBatchContext,
  );

  const attr = 'data-props';

  const open = checkSsr(() => {
    const el = document.getElementById(dialogId);
    el.setAttribute(attr, JSON.stringify(args));
    el.click({
      target: el,
    });
  });

  const handleOpen = (ev, next) => {
    try {
      setData(JSON.parse(ev.target.getAttribute(attr)));
      next();
    } catch (e) {
      // noop
    }
  };

  const close = checkSsr(() => {
    document.getElementById(dialogId).removeAttribute(attr);
    setData(null);
  });

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

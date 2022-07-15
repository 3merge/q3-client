import React from 'react';
import FileManagerBatchContext from '../FileManagerBatchContext';
import { checkSsr } from '../utils';

const useDialog = (dialogId, args = {}) => {
  const [data, setData] = React.useState(null);
  const { enable, disable } = React.useContext(
    FileManagerBatchContext,
  );

  const open = checkSsr(() => {
    const el = document.getElementById(dialogId);
    el.setAttribute('data-props', JSON.stringify(args));
    el.click();
  });

  const handleOpen = (ev, next) => {
    try {
      setData(
        JSON.parse(ev.target.getAttribute('data-props')),
      );

      next();
    } catch (e) {
      // noop
    }
  };

  const close = checkSsr(() => {
    document
      .getElementById(dialogId)
      .removeAttribute('data-props');

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

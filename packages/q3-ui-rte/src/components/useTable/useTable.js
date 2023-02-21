import React from 'react';
import { invoke } from 'lodash';
// eslint-disable-next-line
import { useEventListener } from 'q3-ui-helpers/lib/hooks';

const useTable = (ref) => {
  const [anchor, setAnchor] = React.useState();
  const containerEl = ref.current?.container;

  const setAnchorAsClosestTable = (el) => {
    if (invoke(el, 'closest', 'table') || null) {
      setAnchor(el);
      return true;
    }

    setAnchor(null);
    return false;
  };

  const exec = (method, ...params) => {
    invoke(
      ref.current.getModule('table'),
      method,
      ...params,
    );

    setAnchor(null);
  };

  useEventListener(containerEl, 'contextmenu', (evt) => {
    if (setAnchorAsClosestTable(evt.target))
      evt.preventDefault();
  });

  useEventListener(containerEl, 'keydown', (evt) => {
    if (evt.keyCode === 121 && evt.shiftKey === true) {
      evt.preventDefault();
      setAnchorAsClosestTable(
        document.getSelection().anchorNode,
      );
    }
  });

  return {
    anchor,

    close() {
      setAnchor(null);
    },

    create() {
      exec('insertTable', 2, 3);
    },

    actions: [
      'insertRowAbove',
      'insertRowBelow',
      'insertColumnLeft',
      'insertColumnRight',
      'deleteRow',
      'deleteColumn',
      'deleteTable',
    ].map((method) => ({
      label: method,
      onClick() {
        exec(method);
      },
    })),
  };
};

export default useTable;

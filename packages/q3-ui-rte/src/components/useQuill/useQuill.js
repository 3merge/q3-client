import React from 'react';
import Quill from 'quill';
import { get, invoke } from 'lodash';
// eslint-disable-next-line
import hljs from 'highlight.js';
// eslint-disable-next-line
import 'highlight.js/styles/atom-one-dark.css';

const hash = (xs) => `#${xs}`;

export default (options = {}) => {
  const ID = get(options, 'editorId', 'q3-editor');
  const TOOLBAR_ID = `${ID}-toolbar`;
  const ref = React.useRef();

  React.useLayoutEffect(() => {
    ref.current = new Quill(hash(ID), {
      modules: {
        syntax: { hljs },
        table: true,
        toolbar: hash(TOOLBAR_ID),
      },
    });

    if (options?.autofocus) {
      invoke(ref, 'current.focus');
    }
  }, []);

  return {
    ids: {
      root: ID,
      toolbar: TOOLBAR_ID,
    },
    ref,
  };
};

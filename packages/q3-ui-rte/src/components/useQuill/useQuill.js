import React from 'react';
import Quill from 'quill';
import { get, invoke } from 'lodash';
import hljs from 'highlight.js';

import 'quill-paste-smart';
import 'highlight.js/styles/tomorrow-night-blue.css';

const hash = (xs) => `#${xs}`;

export default (options = {}) => {
  const ID = get(options, 'editorId', 'q3-editor');
  const TOOLBAR_ID = `${ID}-toolbar`;
  const ref = React.useRef();

  React.useLayoutEffect(() => {
    ref.current = new Quill(hash(ID), {
      modules: {
        syntax: {
          highlight: (v) => hljs.highlightAuto(v).value,
        },
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

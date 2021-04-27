import React from 'react';
import Quill from 'quill';
import { invoke } from 'lodash';
import 'quill-paste-smart';

const hash = (xs) => `#${xs}`;

export default (options = {}) => {
  const ID = 'q3-editor';
  const TOOLBAR_ID = `${ID}-toolbar`;
  const ref = React.useRef();

  React.useLayoutEffect(() => {
    ref.current = new Quill(hash(ID), {
      modules: {
        toolbar: hash(TOOLBAR_ID),
      },
    });

    if (options?.autofocus) invoke(ref, 'current.focus');
  }, []);

  return {
    ids: {
      root: ID,
      toolbar: TOOLBAR_ID,
    },
    ref,
  };
};

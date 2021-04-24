import React from 'react';
import Quill from 'quill';
import { invoke } from 'lodash';
import 'quill-paste-smart';

const hash = (xs) => `#${xs}`;

export default (options = {}) => {
  const ID = 'q3-editor';
  const TOOLBAR_ID = `${ID}-toolbar`;
  const ref = React.useRef();

  const handleBlur = () => {
    invoke(options, 'onBlur', ref.current.root.innerHTML);
  };

  React.useLayoutEffect(() => {
    ref.current = new Quill(hash(ID), {
      modules: {
        toolbar: hash(TOOLBAR_ID),
      },
    });

    if (options?.autofocus) invoke(ref, 'current.focus');

    if (options?.onBlur)
      ref.current.root.addEventListener('blur', handleBlur);

    return () => {
      // ref.current.root.removeEventListener(
      //   'blur',
      //   handleBlur,
      // );
    };
  }, []);

  return {
    ids: {
      root: ID,
      toolbar: TOOLBAR_ID,
    },
    ref,
  };
};

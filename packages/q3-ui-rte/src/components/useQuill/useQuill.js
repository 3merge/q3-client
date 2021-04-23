import React from 'react';
import Quill from 'quill';

const hash = (xs) => `#${xs}`;

export default () => {
  const ID = 'q3-editor';
  const TOOLBAR_ID = `${ID}-toolbar`;

  const ref = React.useRef();
  const container = React.useRef();

  React.useLayoutEffect(() => {
    ref.current = new Quill(hash(ID), {
      modules: {
        toolbar: hash(TOOLBAR_ID),
      },
    });
  }, []);

  return {
    container,
    ref,
    ID,
    TOOLBAR_ID,
  };
};

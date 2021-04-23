import React from 'react';
import Quill from 'quill';
import DividerBlot from '../DividerBlot';
import VideoBlot from '../VideoBlot';

export default (blot) => {
  const blots = {
    [DividerBlot.blotName]: DividerBlot,
    [VideoBlot.blotName]: VideoBlot,
  };

  React.useLayoutEffect(() => {
    const el = blots[blot];
    if (el) Quill.register(el, true);
  }, []);
};

import React from 'react';
import Quill from 'quill';
import BlotDivider from '../BlotDivider';
import BlotVideo from '../BlotVideo';

export default (blot) => {
  const blots = {
    [BlotDivider.blotName]: BlotDivider,
    [BlotVideo.blotName]: BlotVideo,
  };

  React.useLayoutEffect(() => {
    const el = blots[blot];
    if (el) Quill.register(el, true);
  }, []);
};

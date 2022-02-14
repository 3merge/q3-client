import React from 'react';
import Quill from 'quill';
import BlotDivider from '../BlotDivider';
import BlotVideo from '../BlotVideo';
import BlotVideoHtml from '../BlotVideoHtml';
import BlotImage from '../BlotImage';
import BlotAudioHtml from '../BlotAudioHtml';

export default (blot) => {
  const blots = {
    [BlotDivider.blotName]: BlotDivider,
    [BlotVideo.blotName]: BlotVideo,
    [BlotVideoHtml.blotName]: BlotVideoHtml,
    [BlotImage.blotName]: BlotImage,
    [BlotAudioHtml.blotName]: BlotAudioHtml,
  };

  React.useLayoutEffect(() => {
    const el = blots[blot];
    if (el) Quill.register(el, true);
  }, []);
};

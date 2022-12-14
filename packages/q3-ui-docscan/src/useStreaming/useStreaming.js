import React from 'react';
import { invoke } from 'lodash';
import { FPS } from '../constants';

const useStreaming = (handlers) => {
  const begin = Date.now();

  React.useEffect(() => {
    const delay = 1000 / FPS - (Date.now() - begin);

    const processVideo = () => {
      invoke(handlers, 'onExit'); // kills previous frames
      invoke(handlers, 'onStream'); // starts again

      setTimeout(() => {
        requestAnimationFrame(processVideo);
      }, delay);
    };

    processVideo();
  }, []);
};

export default useStreaming;

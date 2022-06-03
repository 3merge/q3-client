import React from 'react';
import { browser } from 'q3-ui-helpers';
import { isFunction } from 'lodash';

const useCamera = (onLoad) => {
  const camera = React.useRef();
  const [error, setError] = React.useState();

  React.useEffect(() => {
    if (browser.isBrowserReady())
      navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            facingMode: 'environment',
            height: { ideal: 2160 },
            width: { ideal: 4096 },
          },
        })
        .then((stream) => {
          const video = camera.current;
          video.addEventListener(
            'loadedmetadata',
            function () {
              if (isFunction(onLoad)) onLoad(this);
            },
            true,
          );

          video.srcObject = stream;
          video.play();
        })
        .catch((e) => {
          setError(true);
        });
  }, []);

  return {
    camera,
    error,
  };
};

export default useCamera;

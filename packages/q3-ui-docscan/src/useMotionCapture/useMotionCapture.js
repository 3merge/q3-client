import React from 'react';
import { browser } from 'q3-ui-helpers';
import { calculatePixelScore } from '../utils';

const WIDTH = 360;
const HEIGHT = WIDTH * 1.5;
const IMAGE_SCORE_THRESHOLD = 950;
const PIXEL_SCORE_THRESHOLD = 64;

function MotionCapture() {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const imageParams = [0, 0, WIDTH, HEIGHT];

  canvas.height = HEIGHT;
  canvas.width = WIDTH;
  context.globalCompositeOperation = 'difference';

  const getData = () =>
    context.getImageData(...imageParams);

  const paint = (xs) => {
    context.drawImage(xs, ...imageParams);
  };

  const clean = (xs) => {
    context.clearRect(...imageParams);
    paint(xs);
  };

  return (video) => {
    paint(video);

    let imageScore = 0;
    const imageData = getData();

    for (let i = 0; i < imageData.data.length; i += 4)
      if (
        calculatePixelScore(imageData.data, i) >=
        PIXEL_SCORE_THRESHOLD
      )
        imageScore += 1;

    clean(video);
    return imageScore >= IMAGE_SCORE_THRESHOLD;
  };
}

const useMotionCapture = (
  videoStreamElement,
  { onCaptureReady },
) => {
  const [isMoving, setIsMoving] = React.useState(true);

  const useEffectWithWebCamFeed = (fn, deps = []) =>
    React.useLayoutEffect(() => {
      const video = videoStreamElement;
      return video &&
        video.videoWidth &&
        video.videoHeight &&
        browser.isBrowserReady()
        ? fn(video)
        : undefined;
    }, deps);

  useEffectWithWebCamFeed((v) => {
    const capture = MotionCapture();
    const timer = setInterval(() => {
      setIsMoving(capture(v));
    }, 320);

    return () => {
      clearInterval(timer);
    };
  });

  useEffectWithWebCamFeed(() => {
    if (!isMoving) {
      onCaptureReady();
    }
  }, [isMoving]);

  return isMoving;
};

export default useMotionCapture;

import React from 'react';
import { map, round } from 'lodash';
import useOpenCv from '../useOpenCv';
import {
  calculateFourCornersOfRectangle,
  convertData32SIntoArrayPair,
} from '../utils';

const useDocumentBoundaryDetection = (
  videoStreamElement,
) => {
  const canvasElement = React.useRef();
  const opencv = useOpenCv(canvasElement);

  return {
    canvasElement,
    detect() {
      const element = videoStreamElement;
      const { height, width, videoHeight, videoWidth } =
        element;

      element.height = videoHeight;
      element.width = videoWidth;

      const { frame } = opencv(element, {
        contour: true,
        crop: false,
        srcType: 'video',
      }).run();

      const calculatePercent = (a, b) =>
        round((a / b) * 100, 2);

      const multiplyByRatio = (num) =>
        round(num * round(width / videoWidth, 2), 2);

      element.height = height;
      element.width = width;

      return {
        width: multiplyByRatio(videoWidth),
        height: multiplyByRatio(videoHeight),
        coordinates: map(
          calculateFourCornersOfRectangle(
            convertData32SIntoArrayPair(frame?.data32S),
          ),
          ({ x, y }) =>
            [
              calculatePercent(x, videoWidth),
              calculatePercent(y, videoHeight),
            ].join(','),
        ).join(' '),
      };
    },
  };
};

export default useDocumentBoundaryDetection;

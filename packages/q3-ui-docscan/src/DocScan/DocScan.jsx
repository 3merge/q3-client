import React from 'react';
import { useScript } from 'q3-ui-helpers/lib/hooks';
import {
  first,
  last,
  sortBy,
  map,
  uniq,
  max,
  min,
  mean,
} from 'lodash';
import Webcam from 'react-webcam';

function useDocumentScanner(canvasElementOutput) {
  const {
    error = false,
    init = false,
    instance: cv,
  } = useScript(
    'https://cdn.jsdelivr.net/npm/opencv-browser@1.0.0/opencv.min.js',
    'cv',
  );

  const fn = (video) => {
    const explodeCoordinates = ({ x, y }) => [x, y];

    const makePointsArrayFromMatInstance = ({
      data32S = [],
    }) =>
      Array.from({
        length: 4,
      }).map(
        (_, idx) =>
          new cv.Point(
            data32S[idx * 2],
            data32S[idx * 2 + 1],
          ),
      );

    const makeDimensionsArrayFromPoints = ([
      tlxaxis,
      tlyaxis,
      trxaxis,
      tryaxis,
      brxaxis,
      bryaxios,
      blxaxis,
      blyaxis,
    ]) => {
      const height = Math.ceil(
        mean([
          Math.sqrt(
            (trxaxis - brxaxis) ** 2 +
              (tryaxis - bryaxios) ** 2,
          ),

          Math.sqrt(
            (tlxaxis - blxaxis) ** 2 +
              (tlyaxis - blyaxis) ** 2,
          ),
        ]),
      );

      const width = Math.ceil(
        mean([
          Math.sqrt(
            (brxaxis - blxaxis) ** 2 +
              (bryaxios - blyaxis) ** 2,
          ),

          Math.sqrt(
            (trxaxis - tlxaxis) ** 2 +
              (tryaxis - tlyaxis) ** 2,
          ),
        ]),
      );

      return [
        new cv.Point(0, 0),
        new cv.Point(width, 0),
        new cv.Point(width, height),
        new cv.Point(0, height),
      ];
    };

    const reorderPointsArray = (pts = []) => {
      const copied = map(pts, (item) => ({
        ...item,
        sum: item.x + item.y,
        diff: item.y - item.x,
      }));

      const diffed = sortBy(copied, 'diff');
      const summed = sortBy(copied, 'sum');

      return [
        // tl
        first(summed),
        // tr
        first(diffed),
        // br
        last(summed),
        // bl
        last(diffed),
      ]
        .map(explodeCoordinates)
        .flat();
    };

    const makeMatFromReorderedPointsArray = (pts = []) =>
      cv.matFromArray(4, 1, cv.CV_32FC2, pts);

    class DocumentScannerCommander {
      constructor() {
        const src = new cv.Mat(
          video.height,
          video.width,
          cv.CV_8UC4,
        );

        const cap = new cv.VideoCapture(video);
        cap.read(src);

        this.original = src;
        this.src = src;
      }

      get originalImageSize() {
        return new cv.Size(
          this.original.cols,
          this.original.rows,
        );
      }

      edge() {
        const dst = new cv.Mat();
        cv.cvtColor(this.src, dst, cv.COLOR_BGR2GRAY);
        cv.blur(dst, dst, new cv.Size(3, 3));
        cv.Canny(dst, dst, 2000, 5000, 7, false);

        this.src = dst;
      }

      clip(mat) {
        const dst = this.original.clone();
        const pts = reorderPointsArray(
          makePointsArrayFromMatInstance(mat),
        );
        const dims = reorderPointsArray(
          makeDimensionsArrayFromPoints(pts),
        );

        cv.warpPerspective(
          this.original,
          dst,
          cv.getPerspectiveTransform(
            makeMatFromReorderedPointsArray(pts),
            makeMatFromReorderedPointsArray(dims),
          ),
          new cv.Size(uniq(dims)[1], uniq(dims)[2]),
          cv.INTER_LINEAR,
        );

        cv.cvtColor(dst, dst, cv.COLOR_BGR2GRAY);
        this.src = dst;
        return this;
      }

      contour() {
        const dst = this.original.clone();
        const { src } = this;
        const contours = new cv.MatVector();

        cv.findContours(
          src.clone(),
          contours,
          new cv.Mat(),
          cv.RETR_LIST,
          cv.CHAIN_APPROX_SIMPLE,
        );

        const screenCnt = Array.from({
          length: contours.size(),
        }).reduce((acc, _, idx) => {
          const contour = contours.get(idx);
          const approx = new cv.Mat();
          const size = cv.contourArea(contour);

          cv.approxPolyDP(
            contour,
            approx,
            0.05 * cv.arcLength(contour, true),
            true,
          );

          if (
            approx.rows === 4 &&
            size > (acc?.size || 0) &&
            size > 800
          ) {
            return {
              size: cv.contourArea(contour),
              mat: approx,
            };
          }

          return acc;
        }, null);

        if (!screenCnt?.mat) {
          this.src = this.original;
          return;
        }

        const contours2 = new cv.MatVector();
        contours2.push_back(screenCnt.mat);

        cv.drawContours(
          dst,
          contours2,
          0,
          new cv.Scalar(255, 0, 0, 255),
          2,
        );

        this.src = dst;
        this.clip(screenCnt.mat);
      }

      run() {
        // console.log(cv.getBuildInformation());

        this.edge();
        this.contour();
        cv.imshow(canvasElementOutput, this.src);

        return () => {
          try {
            this.original.delete();
            this.src.delete();
          } catch (e) {
            // noop
          }
        };
      }
    }

    const cmd = new DocumentScannerCommander();
    return cmd.run();
  };

  return {
    isReady: init && !error && typeof cv === 'object',
    run: fn,
    init,
    error,
  };
}

const ScannerCanvas = () => {
  const output = React.useRef();
  const begin = Date.now();
  const { isReady, run } = useDocumentScanner(
    output.current,
  );

  React.useEffect(() => {
    const FPS = 30;
    const video = document.getElementById('preview');
    const delay = 1000 / FPS - (Date.now() - begin);

    let streaming;
    let clean;

    if (isReady && video) {
      clean = run(video);
      streaming = setInterval(() => {
        if (clean) clean();
        clean = run(video);
      }, delay);
    }

    return () => {
      if (clean) clean();
      if (streaming) clearInterval(streaming);
    };
  }, [isReady]);

  return (
    <canvas
      ref={output}
      title=""
      style={{
        maxHeight: 850,
        maxWidth: '100%',
        display: 'block',
      }}
    />
  );
};

const Scanner = () => (
  <Webcam
    audio={false}
    id="preview"
    height={500}
    width={450}
  >
    {({ getScreenshot }) => (
      <ScannerCanvas getScreenshot={getScreenshot} />
    )}
  </Webcam>
);

export default Scanner;

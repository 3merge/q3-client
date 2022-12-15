import { size } from 'lodash';
import {
  calculateFourCornersOfRectangle,
  convertDimensionsIntoCoordinates,
  calculateDimensions,
  convertData32SIntoArrayPair,
  isApproximatelyTheLargestRectangle,
} from '../utils';

const DocScanCommander = (cv) => {
  const asPoints = (xs) =>
    cv.matFromArray(
      4,
      1,
      cv.CV_32FC2,
      xs.flatMap((item) => [item.x, item.y]),
    );

  const getArea = (xs) => {
    try {
      if (!xs) throw new Error('requires mat');
      return cv.contourArea(xs);
    } catch (e) {
      return 0;
    }
  };

  const makeMatVectorFromSingleMat = (mat) => {
    const vect = new cv.MatVector();
    vect.push_back(mat);
    return vect;
  };

  const locateLargestRectangle = (xs) =>
    Array.from({ length: xs.size() }).reduce(
      (acc, _, idx) => {
        const approx = new cv.Mat();
        const contour = xs.get(idx);

        cv.approxPolyDP(
          contour,
          approx,
          0.05 * cv.arcLength(contour, true),
          true,
        );

        return isApproximatelyTheLargestRectangle(
          approx,
          acc,
          getArea,
        )
          ? approx
          : acc;
      },
      null,
    );

  class InternalEngine {
    initSrc(src) {
      this.original = src;
      this.src = src;
      return this;
    }

    initSrcImage(img) {
      return this.initSrc(cv.imread(img));
    }

    initSrcVideo(video) {
      const src = new cv.Mat(
        video.height,
        video.width,
        cv.CV_8UC4,
      );

      this.videoStream = new cv.VideoCapture(video);
      this.videoStream.read(src);
      return this.initSrc(src);
    }

    crop() {
      if (!size(this.frame?.data32S)) return this;

      const dst = this.original.clone();
      const pts = calculateFourCornersOfRectangle(
        convertData32SIntoArrayPair(this.frame.data32S),
      );

      const { height, width } = calculateDimensions(pts);

      cv.warpPerspective(
        this.original,
        dst,
        cv.getPerspectiveTransform(
          asPoints(pts),
          asPoints(
            convertDimensionsIntoCoordinates({
              height,
              width,
            }),
          ),
        ),

        new cv.Size(width, height),
        cv.INTER_LINEAR,
      );

      cv.cvtColor(dst, dst, cv.COLOR_BGR2GRAY);
      this.src = dst;
      return this;
    }

    edge() {
      const dst = new cv.Mat();
      cv.cvtColor(this.src, dst, cv.COLOR_BGR2GRAY);
      cv.blur(dst, dst, new cv.Size(3, 3));
      cv.Canny(dst, dst, 0, 255, 3, true);
      this.src = dst;
      return this;
    }

    findContoursInSrc() {
      const vect = new cv.MatVector();
      const { src } = this;

      cv.findContours(
        src.clone(),
        vect,
        new cv.Mat(),
        cv.RETR_LIST,
        cv.CHAIN_APPROX_SIMPLE,
      );

      return vect;
    }

    drawFrameOnOriginal() {
      const dst = this.original.clone();

      if (this.frame)
        cv.drawContours(
          dst,
          makeMatVectorFromSingleMat(this.frame),
          0,
          // change colour?
          new cv.Scalar(255, 0, 0, 255),
          1,
        );

      this.src = dst;
      return this;
    }

    contour() {
      this.frame = locateLargestRectangle(
        this.findContoursInSrc(),
      );

      this.drawFrameOnOriginal();
      return this;
    }

    destroy() {
      try {
        this.original.delete();
        this.src.delete();
        return this;
      } catch (e) {
        return this;
      }
    }

    run(outputNode, options) {
      if (options?.debug) {
        // eslint-disable-next-line
        console.log(cv.getBuildInformation());
      }

      this.edge();
      this.contour();

      if (options?.crop) {
        this.crop();
      }

      cv.imshow(outputNode, this.src);
      return this.destroy.bind(this);
    }
  }

  return (inputNode, outputNode, options = {}) => {
    const cmd = new InternalEngine();

    if (options?.srcType === 'video')
      cmd.initSrcVideo(inputNode);
    else if (options.srcType === 'image')
      cmd.initSrcImage(inputNode);
    else
      throw new Error(
        'Requires srcType of `image` or `video` to run',
      );

    return cmd.run(outputNode, options);
  };
};

export default DocScanCommander;

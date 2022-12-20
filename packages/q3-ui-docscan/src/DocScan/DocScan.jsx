import React from 'react';
import PropTypes from 'prop-types';
import ReactWebcam from 'react-webcam';
import { Box } from '@material-ui/core';
import { round } from 'lodash';
import Dialog from '../Dialog';
import DocScanCapture from '../DocScanCapture';
import ContextProvider from '../ContextProvider';
import DocScanPreview from '../DocScanPreview';
import ImageReview from '../ImageReview';
import withClientDimensions from '../withClientDimensions';
import useStyle from './styles';

const Camera = withClientDimensions(ReactWebcam);

function handleVideoResize() {
  const zoom = round(this.width / this.videoWidth, 1);

  if (zoom < 1) {
    try {
      this.parentNode.querySelector(
        'canvas:last-of-type',
      ).style.zoom = zoom;
    } catch (e) {
      // noop
    }
  }

  const w = this.videoWidth;
  const h = this.videoHeight;
  this.width = w;
  this.height = h;
}

export const Scanner = ({ upload }) => {
  const [img, setImg] = React.useState(null);
  const videoEl = React.useRef();
  const cls = useStyle();

  if (img)
    return (
      <ImageReview
        clear={() => setImg(null)}
        src={img}
        upload={upload}
      />
    );

  return (
    <ContextProvider>
      <Box className={cls.root}>
        <Camera
          audio={false}
          forceScreenshotSourceSize
          ref={(webcam) => {
            if (webcam?.video) {
              webcam?.video.addEventListener(
                'resize',
                handleVideoResize,
                false,
              );
            }

            videoEl.current = webcam;
          }}
          videoConstraints={{
            width: { ideal: 4096 },
            height: { ideal: 2160 },
            facingMode: 'environment',
          }}
          screenshotFormat="image/png"
          screenshotQuality={1}
        >
          {({ getScreenshot }) => (
            <DocScanCapture
              getScreenshot={getScreenshot}
              setScreenshot={setImg}
            />
          )}
        </Camera>
        <DocScanPreview ref={videoEl} />
      </Box>
    </ContextProvider>
  );
};

Scanner.propTypes = {
  upload: PropTypes.func.isRequired,
};

export default (props) => (
  <Dialog>
    <Scanner {...props} />
  </Dialog>
);

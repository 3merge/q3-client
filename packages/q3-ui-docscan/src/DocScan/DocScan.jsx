import React from 'react';
import PropTypes from 'prop-types';
import ReactWebcam from 'react-webcam';
import { Box } from '@material-ui/core';
import Dialog from '../Dialog';
import DocScanCapture from '../DocScanCapture';
import ContextProvider from '../ContextProvider';
import SvgBoundary from '../SvgBoundary';
import ImageReview from '../ImageReview';
import withClientDimensions from '../withClientDimensions';
import useStyle from './styles';

const Camera = withClientDimensions(ReactWebcam);

export const Scanner = ({ upload }) => {
  const [img, setImg] = React.useState(null);
  const [vid, setVid] = React.useState(null);
  const cls = useStyle();

  const handleWebcamRef = (e) => {
    const node = e?.video;

    if (node)
      node.addEventListener('loadeddata', function () {
        setVid(this);
      });
  };

  const handleImageClear = () => {
    setImg(null);
  };

  return (
    <ContextProvider>
      <Box className={cls.root}>
        {/** Allows us to hide capture button */}
        {vid && !img && <SvgBoundary stream={vid} />}
        <Camera
          audio={false}
          forceScreenshotSourceSize
          ref={handleWebcamRef}
          screenshotFormat="image/png"
          screenshotQuality={1}
          videoConstraints={{
            width: { ideal: 4096 },
            height: { ideal: 2160 },
            facingMode: 'environment',
          }}
        >
          {({ getScreenshot }) =>
            img ? (
              <ImageReview
                clear={handleImageClear}
                src={img}
                upload={upload}
              />
            ) : (
              <DocScanCapture
                getScreenshot={getScreenshot}
                setScreenshot={setImg}
              />
            )
          }
        </Camera>
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

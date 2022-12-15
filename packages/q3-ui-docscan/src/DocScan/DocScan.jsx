import React from 'react';
import ReactWebcam from 'react-webcam';
import { Box } from '@material-ui/core';
import DocScanCapture from '../DocScanCapture';
import ContextProvider from '../ContextProvider';
import DocScanPreview from '../DocScanPreview';
import ImageReview from '../ImageReview';
import withClientDimensions from '../withClientDimensions';
import withStartButton from '../withStartButton';
import useStyle from './styles';

const Camera = withClientDimensions(ReactWebcam);

const Scanner = ({ upload }) => {
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
          ref={videoEl}
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

export default withStartButton(Scanner);

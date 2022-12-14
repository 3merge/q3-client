import React from 'react';
import Webcam from 'react-webcam';
import Box from '@material-ui/core/Box';
import DocScanCapture from '../DocScanCapture';
import Context from '../Context';
import DocScanPreview from '../DocScanPreview';
import useOpenCvScript from '../useOpenCvScript';
import { CLIENT_HEIGHT, CLIENT_WIDTH } from '../constants';
import useStyle from './styles';

const Scanner = () => {
  const [img, setImg] = React.useState(null);
  const { cv, error, isReady } = useOpenCvScript();
  const videoEl = React.useRef();
  const cls = useStyle();

  if (error) return 'Noop';
  if (!isReady) return 'Building';

  if (img)
    return (
      <>
        <img src={img} />
        <button
          onClick={() => {
            setImg(null);
          }}
        >
          B
        </button>
        <button
          onClick={() => {
            alert('UPLOADED...');
          }}
        >
          UPLOAD.
        </button>
      </>
    );

  return (
    <Box className={cls.root}>
      <Webcam
        audio={false}
        height={CLIENT_HEIGHT}
        ref={videoEl}
        videoConstraints={{
          height: CLIENT_HEIGHT,
          width: CLIENT_WIDTH,
        }}
        width={CLIENT_WIDTH}
      >
        {({ getScreenshot }) => (
          <Context.Provider value={cv}>
            <DocScanCapture
              getScreenshot={getScreenshot}
              setScreenshot={setImg}
            />
            <DocScanPreview ref={videoEl} />
          </Context.Provider>
        )}
      </Webcam>
    </Box>
  );
};

export default Scanner;

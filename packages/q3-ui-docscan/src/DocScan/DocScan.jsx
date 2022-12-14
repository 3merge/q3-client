import React from 'react';
import Webcam from 'react-webcam';
import DocScanCapture from '../DocScanCapture';
import Context from '../Context';
import DocScanPreview from '../DocScanPreview';
import useOpenCvScript from '../useOpenCvScript';

const Scanner = () => {
  const { cv, error, isReady } = useOpenCvScript();
  const videoEl = React.useRef();

  if (error) return 'Noop';
  if (!isReady) return 'Building';

  return (
    <Webcam
      audio={false}
      ref={videoEl}
      height={500}
      width={500}
      style={{
        height: 500,
        width: 500,
        position: 'absolute',
        top: 0,
      }}
    >
      {({ getScreenshot }) => (
        <Context.Provider value={cv}>
          <DocScanCapture getScreenshot={getScreenshot} />
          <DocScanPreview ref={videoEl} />
        </Context.Provider>
      )}
    </Webcam>
  );
};

export default Scanner;

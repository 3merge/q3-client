import React from 'react';
import useStreaming from '../useStreaming';
import useOpenCv from '../useOpenCv';
import { getRefNode } from '../utils';

const DocScanPreview = React.forwardRef((props, ref) => {
  const output = React.useRef();
  const openCvInstance = React.useRef();
  const run = useOpenCv(output);

  useStreaming({
    onStream: () => {
      openCvInstance.current = run(getRefNode(ref)?.video, {
        contour: true,
        crop: false,
        srcType: 'video',
      });
    },
    onExit: () => {
      try {
        // should stream
        openCvInstance.current();
      } catch (e) {
        // noop
      }
    },
  });

  return (
    <canvas
      ref={output}
      title="video stream"
      style={{
        position: 'absolute',
        height: 500,
        width: 500,
      }}
    />
  );
});

export default DocScanPreview;

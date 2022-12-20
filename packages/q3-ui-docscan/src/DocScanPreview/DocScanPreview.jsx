import React from 'react';
import useOpenCv from '../useOpenCv';
import { getRefNode } from '../utils';

const DocScanPreview = React.forwardRef((props, ref) => {
  const output = React.useRef();
  const opencv = useOpenCv(output);

  React.useEffect(() => {
    let running = true;

    const { run, destroy } = opencv(
      getRefNode(ref)?.video,
      {
        contour: true,
        crop: false,
        srcType: 'video',
      },
    );

    const wait = () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 175);
      });

    const recurse = async () => {
      run();

      await wait();
      return Promise.resolve(
        running ? recurse() : undefined,
      );
    };

    Promise.resolve(recurse());

    return () => {
      running = false;
      destroy();
    };
  }, []);

  return <canvas ref={output} title="video stream" />;
});

export default DocScanPreview;

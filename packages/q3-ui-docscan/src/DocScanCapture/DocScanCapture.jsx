import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import useOpenCv from '../useOpenCv';

// confirmation window?

const DocScanCapture = ({ getScreenshot }) => {
  const output = React.useRef();
  const openCvInstance = React.useRef();
  const run = useOpenCv(output);

  const handleClick = () => {
    const img = document.createElement('img');
    img.src = getScreenshot();
    img.addEventListener(
      'load',
      function assignDimensionsToSourceImage() {
        // eslint-disable-next-line
        this.height = this.naturalHeight;
        // eslint-disable-next-line
        this.width = this.naturalWidth;
        openCvInstance.current = run(this, {
          crop: true,
          srcType: 'image',
        });
      },
    );
  };

  React.useEffect(
    () => () => {
      try {
        openCvInstance.current();
      } catch (e) {
        // noop
      }
    },
    [],
  );

  return (
    <>
      <Button onClick={handleClick}>Hey</Button>
      <canvas
        ref={output}
        title="scan capture output"
        style={{
          position: 'absolute',
          top: 500,
          left: 0,
        }}
      />
    </>
  );
};

DocScanCapture.propTypes = {
  getScreenshot: PropTypes.func.isRequired,
};

export default DocScanCapture;

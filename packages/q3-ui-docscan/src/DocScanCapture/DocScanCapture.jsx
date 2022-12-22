import React from 'react';
import { Box, Fab } from '@material-ui/core';
import ScannerIcon from '@material-ui/icons/Scanner';
import PropTypes from 'prop-types';
import useOpenCv from '../useOpenCv';
import useStyle from './styles';

const DocScanCapture = ({
  getScreenshot,
  setScreenshot,
}) => {
  const cls = useStyle();
  const output = React.useRef();
  const opencv = useOpenCv(output);

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

        const { run, destroy } = opencv(this, {
          crop: true,
          srcType: 'image',
        });

        run();
        setScreenshot(
          output.current.toDataURL('image/png'),
        );

        destroy();
      },
    );
  };

  return (
    <>
      <canvas ref={output} title="image output" />
      <Box className={cls.overlap} />
      <Fab
        id="capture"
        aria-label="capture"
        className={cls.button}
        color="secondary"
        onClick={handleClick}
        size="large"
      >
        <ScannerIcon />
      </Fab>
    </>
  );
};

DocScanCapture.propTypes = {
  getScreenshot: PropTypes.func.isRequired,
  setScreenshot: PropTypes.func.isRequired,
};

export default DocScanCapture;

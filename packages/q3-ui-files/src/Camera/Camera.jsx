import React from 'react';
import PropTypes from 'prop-types';
import PhotoEditor from '../PhotoEditor';
import useCamera from '../useCamera';

const forceNumberValue = (x) => {
  const n = Number(x);
  return !Number.isNaN(n) ? n : 0;
};

const byTwo = (x) => forceNumberValue(x) / 2;
const toPixel = (num = 0) => `${forceNumberValue(num)}px`;

const Camera = () => {
  const canvas = React.useRef();
  const frame = React.useRef();

  const [aspectRatio] = React.useState(1.294);
  const [image, setImage] = React.useState(null);

  const generateFrameDimensions = (
    videoEl,
    options = {},
  ) => {
    const { videoHeight, videoWidth } = videoEl;
    const { includeFrameCoordinates = false } = options;
    const ratio =
      videoWidth > videoHeight
        ? 1 / aspectRatio
        : aspectRatio;

    const w = videoWidth * 0.65;
    const h = w * ratio;

    const dims = {
      height: h,
      width: w,
    };

    if (includeFrameCoordinates)
      Object.assign(dims, {
        top: byTwo(videoHeight) - byTwo(dims.height),
        left: byTwo(videoWidth) - byTwo(dims.width),
      });

    return dims;
  };

  const { camera } = useCamera((videoEl) =>
    Object.entries(
      generateFrameDimensions(videoEl),
    ).forEach(([key, value]) => {
      frame.current.style[key] = toPixel(value);
    }),
  );

  const capture = () => {
    const c = canvas.current;
    const video = camera.current;
    const context = c.getContext('2d');

    const { height, left, top, width } =
      generateFrameDimensions(video, {
        includeFrameCoordinates: true,
      });

    c.height = height * 2;
    c.width = width * 2;
    context.scale(2, 2);

    context.imageSmoothingEnabled = false;
    context.drawImage(
      video,
      left,
      top,
      width,
      height,
      0,
      0,
      width,
      height,
    );

    setImage(c.toDataURL('image/jpeg'));
  };

  return (
    <>
      <button onClick={capture}>GO</button>
      <div>
        <div
          style={{
            display: 'inline-block',
            position: 'relative',
          }}
        >
          {/* eslint-disable-next-line */}
          <video autoPlay playsInline ref={camera} />
          <div
            ref={frame}
            style={{
              border: '4px dashed white',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
              borderRadius: 8,
            }}
          />
        </div>
      </div>
      <canvas
        ref={canvas}
        style={{
          display: 'none',
        }}
      />

      {image && <PhotoEditor image={image} />}
    </>
  );
};

Camera.propTypes = {};

export default Camera;

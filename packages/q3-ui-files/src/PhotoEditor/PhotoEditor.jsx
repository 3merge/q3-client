import React from 'react';

// SCALE
// FILTER

const PhotoEditor = ({ image }) => {
  const [output, setOutput] = React.useState();

  const [brightness, setBrightness] = React.useState(100);
  const [contrast, setContrast] = React.useState(100);
  const [scale, setScale] = React.useState(100);

  React.useEffect(() => {
    const baseImage = new Image();
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    baseImage.src = image;

    baseImage.onload = function () {
      canvas.height = baseImage.height;
      canvas.width = baseImage.width;

      context.filter = `brightness(${brightness}%) contrast(${
        contrast / 100
      })`;

      context.drawImage(
        baseImage,
        0,
        0,
        canvas.width,
        canvas.height,
      );

      setOutput(canvas.toDataURL('image/jpeg'));
      canvas.remove();
    };
  }, [contrast, brightness, scale]);

  React.useEffect(() => {
    setOutput(image);
  }, [image]);

  return output ? (
    <>
      <div>
        <input
          onChange={(e) => {
            setBrightness(e.target.value);
          }}
          type="range"
          min="1"
          max="200"
          value={brightness}
        />
        <input
          onChange={(e) => {
            setContrast(e.target.value);
          }}
          type="range"
          min="1"
          max="200"
          value={contrast}
        />
      </div>
      <img src={output} />
    </>
  ) : null;
};

export default PhotoEditor;

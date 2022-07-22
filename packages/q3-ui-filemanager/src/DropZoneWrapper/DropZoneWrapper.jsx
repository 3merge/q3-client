import React from 'react';
import { useDropzone } from 'react-dropzone';
import useStyle from './styles';
import withAuthBoolean from '../withAuthBoolean';

const DropZoneWrapper = (props) => {
  const { getRootProps, isDragActive } = useDropzone(props);
  const cls = useStyle({
    isDragActive,
  });

  return (
    <div
      id="dropper-container"
      className={cls.root}
      {...getRootProps()}
    >
      <div className={cls.overlay} />
    </div>
  );
};

DropZoneWrapper.defaultProps = {};
DropZoneWrapper.propTypes = {};

export default withAuthBoolean(
  DropZoneWrapper,
  'canCreate',
);

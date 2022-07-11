import React from 'react';
import { useDropzone } from 'react-dropzone';
import Paper from '@material-ui/core/Paper';
import FileManagerAuthContext from '../FileManagerAuthContext';
import useStyle from './styles';

const DropZoneWrapper = (props) => {
  const { getRootProps, isDragActive } = useDropzone(props);
  const cls = useStyle({
    isDragActive,
  });

  const { canCreate } = React.useContext(
    FileManagerAuthContext,
  );

  return canCreate ? (
    <div
      id="dropper-container"
      className={cls.root}
      {...getRootProps()}
    >
      {isDragActive && (
        <>
          <div className={cls.overlay} />
          <Paper>DO SOMETHING</Paper>
        </>
      )}
    </div>
  ) : null;
};

DropZoneWrapper.defaultProps = {};
DropZoneWrapper.propTypes = {};

export default DropZoneWrapper;

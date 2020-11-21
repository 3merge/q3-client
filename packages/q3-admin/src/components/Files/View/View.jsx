import React from 'react';
import { FileList } from 'q3-ui-filemanager';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useFiles } from 'q3-hooked';

const Upload = () => {
  const { loading, ...props } = useFiles();

  return !loading ? (
    <FileList {...props} />
  ) : (
    <CircularProgress />
  );
};

export default Upload;

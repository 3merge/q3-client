import React from 'react';
import { FileList } from 'q3-ui-filemanager';
import useRest from 'q3-ui-rest';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Definitions } from '../state';

const Upload = () => {
  const { collectionName, id } = React.useContext(
    Definitions,
  );

  const { uploads = [], post, remove, fetching } = useRest({
    runOnInit: true,
    url: `/${collectionName}/${id}/uploads`,
    key: 'uploads',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return !fetching ? (
    <FileList
      files={uploads}
      onDelete={remove}
      onDrop={post}
    />
  ) : (
    <CircularProgress />
  );
};

export default Upload;

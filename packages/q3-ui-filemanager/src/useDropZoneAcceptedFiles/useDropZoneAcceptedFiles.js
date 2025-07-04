import React from 'react';
import { map } from 'lodash';
import FileManagerContext from '../FileManagerContext';
import FileManagerCurrentContext from '../FileManagerCurrentContext';

const useDropZoneAcceptedFiles = () => {
  const { uploadS3 } = React.useContext(FileManagerContext);
  const { current } = React.useContext(
    FileManagerCurrentContext,
  );

  const [pending, setPending] = React.useState([]);

  const clearPending = () => setPending([]);

  const markPendingWithErrorProperty = () =>
    setPending((prevState) =>
      map(prevState, (file) => ({
        ...file,
        error: true,
      })),
    );

  const onDrop = async (acceptedFiles) => {
    setPending(acceptedFiles);

    try {
      await uploadS3(acceptedFiles, current);
      clearPending();
    } catch (e) {
      console.log(e)
      markPendingWithErrorProperty();
    }
  };

  return {
    markPendingWithErrorProperty,
    onDrop,
    pending,
  };
};

export default useDropZoneAcceptedFiles;

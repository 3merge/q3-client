import React from 'react';
import { forEach, map } from 'lodash';
import FileManagerContext from '../FileManagerContext';
import FileManagerCurrentContext from '../FileManagerCurrentContext';

const useDropZoneAcceptedFiles = () => {
  const { current } = React.useContext(
    FileManagerCurrentContext,
  );

  const { post } = React.useContext(FileManagerContext);
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
      const f = new FormData();
      forEach(acceptedFiles, (item) => {
        Object.defineProperty(item, 'folderId', {
          value: current,
          writable: true,
        });

        f.append(item.name, item);
      });

      await post(f);
      clearPending();
    } catch (e) {
      markPendingWithErrorProperty();
    }
  };

  return {
    onDrop,
    pending,
  };
};

export default useDropZoneAcceptedFiles;

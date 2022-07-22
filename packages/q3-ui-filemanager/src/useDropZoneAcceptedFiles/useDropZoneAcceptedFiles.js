import React from 'react';
import { map } from 'lodash';
import compress from 'browser-image-compression';
import FileManagerContext from '../FileManagerContext';
import FileManagerCurrentContext from '../FileManagerCurrentContext';

const useDropZoneAcceptedFiles = () => {
  const { post } = React.useContext(FileManagerContext);
  const { current } = React.useContext(
    FileManagerCurrentContext,
  );

  const [pending, setPending] = React.useState([]);

  const assignFolderIdToFileBlob = (blob) => {
    Object.defineProperty(blob, 'folderId', {
      value: current,
      writable: true,
    });

    if (blob.folderId !== current)
      Object.assign(blob, {
        folderId: current,
      });

    return blob;
  };

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
      await Promise.all(
        map(acceptedFiles, async (item) => {
          let data = item;
          const originalName = item.name;

          try {
            data = await compress(data, {
              maxSizeMB: 4.5,
              useWebWorker: true,
              maxWidthOrHeight: 1920,
            });
          } catch (e) {
            // noop
          }

          assignFolderIdToFileBlob(data);
          f.append(item.name, data, originalName);
        }),
      );

      await post(f);
      clearPending();
    } catch (e) {
      markPendingWithErrorProperty();
    }
  };

  return {
    assignFolderIdToFileBlob,
    markPendingWithErrorProperty,
    onDrop,
    pending,
  };
};

export default useDropZoneAcceptedFiles;

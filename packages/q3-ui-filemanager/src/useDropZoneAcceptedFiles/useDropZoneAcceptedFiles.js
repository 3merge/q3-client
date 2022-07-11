import React from 'react';
import { compact, forEach, map, replace } from 'lodash';
import FileManagerContext from '../FileManagerContext';

const useDropZoneAcceptedFiles = (
  currentDirectory = null,
) => {
  const { post } = React.useContext(FileManagerContext);
  const [pending, setPending] = React.useState([]);

  const clearPending = () => setPending([]);

  const joinFilePaths = (a = []) => {
    const out = compact(a).join('/').replace(/\/+/g, '/');
    return out.startsWith('/') ? out.substr(1) : out;
  };

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
      forEach(acceptedFiles, (item) =>
        f.append(
          joinFilePaths([
            // dot notation otherwise breaks path
            replace(currentDirectory, /\./g, '/'),
            item.name,
          ]),
          item,
        ),
      );

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

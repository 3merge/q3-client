import React from 'react';
import { array } from 'q3-ui-helpers';
import { mergeWith, setWith, get } from 'lodash';

const customizer = (objValue, srcValue) => {
  if (Array.isArray(objValue))
    return objValue.concat(srcValue);

  return undefined;
};

export const getPath = (filename) => {
  const dir = filename.split('/');
  dir.pop();
  dir.push('default');
  return dir.join('.');
};

export const removeFileExtension = (filename) =>
  filename
    ? filename.substring(0, filename.lastIndexOf('.')) ||
      filename
    : '';

export const makeDirectories = (a = []) =>
  a
    .map((next) => {
      return setWith(
        {},
        // cannot use regular set in case there are dirs with numbers
        // otherwise, it creates an array instead
        getPath(removeFileExtension(next.relativePath)),
        [next],
        Object,
      );
    })
    .reduce((acc, next) => {
      return mergeWith(acc, next, customizer);
    }, {});

const useDir = (files) => {
  const [dir, setDir] = React.useState({
    data: {},
    path: [],
  });

  const getFilesForActivePath = (data) => {
    const structuredFiles = makeDirectories(data);
    const { path = [] } = dir;
    return array.hasLength(path)
      ? get(structuredFiles, path, {})
      : structuredFiles;
  };

  React.useEffect(() => {
    setDir((prevState) => ({
      ...prevState,
      data: getFilesForActivePath(files),
    }));
  }, [files]);

  return {
    dir,
    setDir,
    getFilesForActivePath,
    makeDirectories,
    root: get(dir, 'path', []).join('/'),
    listItems: get(dir, 'data.default', []),
  };
};

export default useDir;

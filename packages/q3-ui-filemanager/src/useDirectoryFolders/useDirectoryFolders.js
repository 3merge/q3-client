import React from 'react';
import {
  compact,
  get,
  omit,
  last,
  reduce,
  isObject,
} from 'lodash';
import { map } from 'lodash';
import FileManagerCurrentContext from '../FileManagerCurrentContext';
import useUploadsDirectories from '../useUploadsDirectories';
import {
  getLastFolder,
  makeDirectoryId,
  makePrivateKey,
} from '../utils';

const maxUpdatedAtContents = (contents = []) =>
  Math.max(
    ...map(
      compact(map(contents, 'updatedAt')),
      (value) => new Date(value),
    ),
  );

const sumContents = (contents = []) =>
  reduce(
    contents,
    (acc, curr) => {
      const n = Number(curr.size);
      return acc + Number.isNaN(n) ? 0 : n;
    },
    0,
  );

const useDirectoryFolder = () => {
  const { current, change } = React.useContext(
    FileManagerCurrentContext,
  );

  const directories = useUploadsDirectories();
  const currentId = makePrivateKey(
    current ? last(current.split('.')) : null,
  );

  const currentDirectory = current
    ? get(directories, current, {})
    : directories;

  const collectObjectNames = (xs, prevFolderPath) =>
    isObject(xs) && !Array.isArray(xs)
      ? Object.entries(xs).reduce((acc, [key, value]) => {
          const currentFolderPath = compact([
            prevFolderPath,
            key,
          ]).join('/');

          if (!key.includes('__'))
            acc.push({
              id: currentFolderPath,
              name: getLastFolder(currentFolderPath),
              children: collectObjectNames(
                value,
                currentFolderPath,
              ),
            });

          return acc;
        }, [])
      : [];

  return {
    change,
    current,

    files: map(
      get(currentDirectory, currentId, []),
      (file) => ({
        ...file,
      }),
      // removes placeholder folders
    ).filter((item) => !item.stub),

    siblings: Object.entries(
      omit(currentDirectory, [currentId]),
    ).map(([key, value]) => {
      const contents = get(value, makePrivateKey(key), []);

      const path = current
        ? `${current.replace(/\./g, '/')}/${key}`
        : key;

      return {
        name: key,
        id: makeDirectoryId(path, directories),
        size: sumContents(contents),
        updatedAt: maxUpdatedAtContents(contents),
        onClick() {
          change(compact([current, key]).join('.'));
        },
        relativePath: key,
        path,
      };
    }),

    tree: collectObjectNames(directories),
  };
};

export default useDirectoryFolder;

import React from 'react';
import { sortBy, reduce } from 'lodash';
import { filter } from 'lodash';
import FileManagerCurrentContext from '../FileManagerCurrentContext';
import FileManagerContext from '../FileManagerContext';
import { normalize } from '../utils';

const useDirectoryFolder = () => {
  const { uploads = [] } = React.useContext(
    FileManagerContext,
  );

  const { current, change } = React.useContext(
    FileManagerCurrentContext,
  );

  const buildBreadrumbs = (folderId = null) =>
    reduce(
      uploads,
      (acc, curr) =>
        normalize(curr.id) === normalize(folderId)
          ? acc
              .concat(curr)
              .concat(buildBreadrumbs(curr.folderId))
          : acc,
      [],
    );

  const buildFolderTree = (folderId = null) =>
    sortBy(
      reduce(
        uploads,
        (acc, curr) =>
          curr.folder &&
          normalize(curr.folderId) === normalize(folderId)
            ? acc.concat({
                children: buildFolderTree(curr.id),
                id: curr.id,
                name: curr.name,
              })
            : acc,
        [],
      ),
      ['name'],
    );

  return React.useMemo(
    () => ({
      change,
      current,

      files: filter(
        uploads,
        (upload) =>
          normalize(upload.folderId) ===
            normalize(current) && !upload.folder,
      ),

      siblings: reduce(
        uploads,
        (acc, curr) =>
          !curr.folder ||
          normalize(curr.folderId) !== normalize(current)
            ? acc
            : acc.concat({
                ...curr,
                onClick() {
                  change(curr.id);
                },
              }),
        [],
      ),

      breadcrumbs: buildBreadrumbs(current).reverse(),
      tree: buildFolderTree(),
    }),
    [current, uploads],
  );
};

export default useDirectoryFolder;

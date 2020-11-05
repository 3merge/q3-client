import React from 'react';
import { object } from 'q3-ui-helpers';
import { useLocation } from '@reach/router';

const getDirectoryPath = (root, id) =>
  typeof root === 'string' ? root.split(id)[0] : '/';

const ensureCollectionPropertiesExist = (
  keys,
  options = {},
) =>
  keys.forEach((key) => {
    if (!Object.keys(options).includes(key))
      throw new Error(
        `Collection missing required property: ${key}`,
      );
  });

const useRootPath = (location, id, resourceName) => {
  const part = id || resourceName;
  return location && typeof location.pathname === 'string'
    ? `${location.pathname.split(part)[0]}${part}`
    : '/';
};

export default (args = {}) => {
  const { id, onMount, resourceName, ...rest } = args;
  const location = useLocation();
  const hasFn = object.isFn(onMount);
  const [hasMounted, setHasMounted] = React.useState(
    !hasFn,
  );

  const rootPath = useRootPath(location, id, resourceName);
  const directoryPath = getDirectoryPath(rootPath, id);

  ensureCollectionPropertiesExist(
    [
      'collectionName',
      'resourceName',
      'resourceNameSingular',
    ],
    args,
  );

  React.useEffect(() => {
    Promise.resolve(
      typeof onMount === 'function' ? onMount() : undefined,
    ).then(() => {
      setHasMounted(true);
    });
  }, [hasMounted, onMount]);

  return {
    ...args,
    directoryPath,
    hasMounted,
    location,
    rootPath,

    // v2 aliases
    directory: directoryPath,
    root: rootPath,
  };
};

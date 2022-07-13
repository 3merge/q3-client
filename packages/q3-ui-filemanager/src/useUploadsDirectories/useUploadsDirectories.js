import React from 'react';
import { get, compact, reduce, set, last } from 'lodash';
import FileManagerContext from '../FileManagerContext';
import { makePrivateKey } from '../utils';

const useUploadsDirectories = () => {
  const { uploads = [] } = React.useContext(
    FileManagerContext,
  );

  const explode = (str = '') =>
    compact(String(str).split('/').slice(0, -1));

  const pushInto = (targetObject, key, value) => {
    const r = get(targetObject, key);
    if (Array.isArray(r)) r.push(value);
    else set(targetObject, key, [value]);
    return targetObject;
  };

  return reduce(
    uploads,
    (acc, curr) => {
      const folders = explode(curr.relativePath);
      const privateKey = makePrivateKey(last(folders));

      return pushInto(
        acc,
        folders.concat(privateKey).join('.'),
        curr,
      );
    },
    {},
  );
};

export default useUploadsDirectories;

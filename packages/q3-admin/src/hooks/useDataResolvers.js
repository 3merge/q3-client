import React from 'react';
import { isFunction, join, compact, omit } from 'lodash';
import { compose } from 'lodash/fp';
import { Definitions } from '../containers/state';

export default (resolvers, options = {}) => {
  const { rootPath } = React.useContext(Definitions);

  const assignRootPath = (xs) => ({
    ...xs,
    url: join(compact([rootPath, xs?.id]), '/'),
  });

  const modifyPhotoPath = (xs) =>
    xs?.photo
      ? omit(
          Object.assign(xs, {
            imgSrc: xs.photo,
          }),
          ['photo'],
        )
      : xs;

  const removeUrlPath = (xs) =>
    options?.disableLink ? omit(xs, ['url']) : xs;

  return compose(
    (xs) =>
      isFunction(resolvers)
        ? { ...xs, ...resolvers(xs) }
        : xs,
    removeUrlPath,
    modifyPhotoPath,
    assignRootPath,
  );
};

/* eslint-disable no-param-reassign */
import React from 'react';
import axios from 'axios';
import { first } from 'lodash';
import {
  Definitions,
  Dispatcher,
} from '../containers/state';
import { slugify } from '../containers/page/utils';

/**
 * @NOTE
 * Since the `post` method uses the `useAuth` URL,
 * it ends up sending requests to /:collection/:id on detail pages.
 * This hook bypasses this behaviour by using axios directly in those situations.
 */
const useAddPostDispatcher = () => {
  const { post } = React.useContext(Dispatcher);
  const { collectionName, id } =
    React.useContext(Definitions);

  return React.useCallback(
    (...args) =>
      id
        ? axios
            .post(slugify(collectionName), first(args))
            .then((r) => r?.data)
        : post(...args),
    [collectionName, id, post],
  );
};

export default useAddPostDispatcher;

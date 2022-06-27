/* eslint-disable no-param-reassign */
import React from 'react';
import { get } from 'lodash';
import { useNavigate } from '@reach/router';
import { string } from 'q3-ui-helpers';
import { Definitions } from '../containers/state';
import useAddPostDispatcher from './useAddPostDispatcher';

const useAdd = (options = {}) => {
  const { directoryPath, resourceNameSingular } =
    React.useContext(Definitions);

  const post = useAddPostDispatcher();
  const navigate = useNavigate();
  const { redirectToNewDocument = true } = options;

  return (...args) =>
    // uncaught error intentional
    post(...args).then((res) => {
      const newId = get(
        res,
        `${resourceNameSingular}.id`,
        null,
      );

      if (newId && redirectToNewDocument)
        navigate(
          `${string.removeTrailingSlash(
            directoryPath,
          )}/${newId}`,
        );

      return res;
    });
};

export default useAdd;

import React from 'react';
import { isString } from 'lodash';
import { formatUrlPath } from '../helpers';
import reducer from './reducer';
import {
  FETCHING,
  FETCHED,
  CREATED,
  UPDATED,
  DELETED,
  DELETED_MANY,
} from './constants';
import useRequest from '../useRequest';
import useRestEffect from '../useRestEffect';

export const decorateDispatchReducerFn = (
  [state, dispatch],
  options = {},
) => ({
  state,

  call: (type, data = {}, err = {}) =>
    dispatch({
      ...options,
      data,
      err,
      type,
    }),

  // mainly the same as above just curried
  passthrough: (type, values) => (payload) => {
    dispatch({
      ...options,
      data: values || payload,
      type,
    });

    return payload;
  },
});

const useRest = ({
  url,
  poll,
  key,
  pluralized,
  select,
  runOnInit = false,
  decorators = {},
  ...options
}) => {
  if (!url) throw new Error('Requires a valid URL');

  const {
    state,
    call,
    passthrough,
  } = decorateDispatchReducerFn(
    React.useReducer(reducer, {
      fetching: runOnInit,
      progress: 0,
    }),
    {
      key,
      pluralized,
    },
  );

  const { assembleUrl, curry, exec } = useRequest({
    namespace: pluralized,
    actions: {
      decorators,
      next: poll,
      store: call,
    },
    options,
  });

  const handleFetchingError = (err, data) => {
    if (!err) return data;
    call(FETCHED, null, err);
    return err;
  };

  const handleGetRequest = (query = '') =>
    exec({
      callback: handleFetchingError,
      method: 'get',
      path: formatUrlPath(
        url,
        // to prevent malformed requests in client apps
        // sometimes the poll method from one useRest is passed directly into another
        isString(query) ? query : '',
        select,
      ),
      resolver: FETCHED,
    });

  const handleGetRequestWithLoading = (query) => {
    call(FETCHING);
    return handleGetRequest(query);
  };

  const methods = {
    get: handleGetRequestWithLoading,
    poll: handleGetRequest,
    replace: passthrough(UPDATED),

    remove: (id) =>
      curry({
        method: 'delete',
        path: assembleUrl([url, id]),
        resolver: passthrough(DELETED, {
          id,
        }),
      }),

    removeBulk: (ids = [], done) =>
      curry({
        method: 'delete',
        path: assembleUrl(url, ids),
        resolver: passthrough(DELETED_MANY, {
          ids,
        }),
        done,
      }),

    patch: (id) =>
      curry({
        method: 'patch',
        path: assembleUrl([url, id]),
        resolver: UPDATED,
      }),

    patchBulk: (ids, done) =>
      curry({
        method: 'patch',
        path: assembleUrl(url, ids),
        resolver: UPDATED,
        callback: done,
      }),

    put: (id) =>
      curry({
        method: 'put',
        path: assembleUrl([url, id]),
        resolver: UPDATED,
      }),

    post: (values) =>
      exec({
        method: 'post',
        path: assembleUrl(url),
        data: values,
        resolver: CREATED,
      }),
  };

  useRestEffect({
    ...options,
    run: handleGetRequestWithLoading,
    runOnInit,
    url,
  });

  return {
    ...state,
    ...methods,
  };
};

export default useRest;

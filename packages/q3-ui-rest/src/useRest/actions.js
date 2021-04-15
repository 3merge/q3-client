import React from 'react';
import Axios from 'axios';
import { invoke } from 'lodash';
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

  const {
    decoratePathWithFlags,
    decorateQueryPathWithFlags,
    curry: curryRequest,
    exec: handleRequest,
  } = useRequest({
    namespace: pluralized,
    actions: {
      decorators,
      done: poll,
      store: call,
    },
    options,
  });

  const handleGetRequest = (query = '') =>
    Axios.get(formatUrlPath(url, query, select))
      .then(({ data }) => {
        invoke(decorators, 'get', data);
        call(FETCHED, data);
        return Promise.resolve(data);
      })
      .catch((err) => {
        call(FETCHED, null, err);
        return Promise.reject(err);
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
      curryRequest({
        method: 'delete',
        path: decoratePathWithFlags([url, id]),
        resolver: passthrough(DELETED, { id }),
      }),

    removeBulk: (ids = [], done) =>
      curryRequest({
        method: 'delete',
        path: decorateQueryPathWithFlags(url, ids),
        resolver: passthrough(DELETED_MANY, { ids }),
        done,
      }),

    patch: (id) =>
      curryRequest({
        method: 'patch',
        path: decoratePathWithFlags([url, id]),
        resolver: UPDATED,
      }),

    patchBulk: (ids, done) =>
      curryRequest({
        method: 'patch',
        path: decorateQueryPathWithFlags(url, ids),
        resolver: UPDATED,
        callback: done,
      }),

    put: (id) =>
      curryRequest({
        method: 'put',
        path: decoratePathWithFlags([url, id]),
        resolver: UPDATED,
      }),

    post: (values) =>
      handleRequest({
        method: 'post',
        path: url,
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

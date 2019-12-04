import React from 'react';
import Axios from 'axios';
import { get, invoke } from 'lodash';
import {
  useNotification,
  useFormHandler,
} from 'q3-ui-forms';
import FileDownload from 'js-file-download';
import { makePath } from '../utils';
import reducer from './reducer';
import {
  FETCHING,
  FETCHED,
  CREATED,
  UPDATED,
  DELETED,
  DELETED_MANY,
} from './constants';

export const getOptions = (url, key, pathToLabel) =>
  Axios.get(url)
    .then(({ data }) =>
      pathToLabel
        ? get(data, key, []).map((i) => ({
            label: get(i, pathToLabel),
            value: i.id,
            ...i,
          }))
        : get(data, key, []),
    )
    .catch(() => {
      return [];
    });

export const getFlatOptions = () => (
  url,
  key,
  pathToLabel,
) =>
  Axios.get(url)
    .then(({ data }) => {
      return get(data, key, []).map((i) =>
        get(i, pathToLabel),
      );
    })
    .catch(() => {
      return [];
    });

export const getAsCSV = (url, params = {}) =>
  Axios({
    url,
    method: 'get',
    transformRequest: [
      (data, headers) => {
        Object.assign(headers, params, {
          'Accept': 'text/csv',
        });
        return data;
      },
    ],
  })
    .then((e) => {
      FileDownload(e.data, 'file.csv');
    })
    .catch(() => {
      // noop
    });

export const useRest = ({
  url,
  redirectOnSearch,
  key,
  pluralized,
  runOnInit = false,
  strategy = 'formik',
  decorators = {},
  location = {},
  history = {},
  headers = {},
}) => {
  if (!url) throw new Error('Requires a valid URL');
  const { search } = location;
  const { onStart, onComplete } = useFormHandler(strategy);
  const { onSuccess, onFail } = useNotification();
  const [state, dispatch] = React.useReducer(reducer, {
    fetching: runOnInit,
    progress: 0,
  });

  const call = (type, data = {}, err = {}) =>
    dispatch({
      key,
      data,
      pluralized,
      err,
      type,
    });

  const handleRequest = (promise, actions, verb) => {
    onStart(actions);
    return promise
      .then(({ data }) => {
        call(verb, data);
        onComplete(null, actions);
        onSuccess(get(data, 'message'));
        return null;
      })
      .catch((err) => {
        onComplete(get(err, 'data'), actions);
        onFail(get(err, 'data.message'));
        return err;
      });
  };

  const wrapUpdateFn = (id, verb) => (values, actions) => {
    invoke(decorators, verb, values);
    return handleRequest(
      invoke(Axios, verb, makePath([url, id]), values),
      actions,
      UPDATED,
    );
  };

  const methods = {
    get(query = '') {
      call(FETCHING);
      return Axios.get(`${url}${query}`)
        .then(({ data }) => {
          call(FETCHED, data);
          return data;
        })
        .catch((err) => {
          call(FETCHED, null, err);
          onFail(get(err, 'data.message'));
          return null;
        });
    },

    remove(id) {
      return () =>
        Axios.delete(makePath([url, id]))
          .then(({ data }) => {
            onSuccess(get(data, 'message'));
            call(DELETED, { id });
            return null;
          })
          .catch((err) => {
            onFail(get(err, 'message'));
            return err;
          });
    },

    removeBulk(ids = []) {
      return Axios.delete(
        `${url}?ids[]=${ids.join('&ids[]=')}`,
      )
        .then(({ data }) => {
          onSuccess(get(data, 'message'));
          call(DELETED_MANY, { ids });
          return null;
        })
        .catch((err) => {
          onFail(get(err, 'message'));
          return err;
        });
    },

    patch(id) {
      const { name } = methods.patch;
      return wrapUpdateFn(id, name);
    },

    put(id) {
      const { name } = methods.put;
      return wrapUpdateFn(id, name);
    },

    post(values, actions) {
      const { name } = methods.post;
      invoke(decorators, name, values);
      return handleRequest(
        Axios.post(url, values, { headers }),
        actions,
        CREATED,
      );
    },
  };

  React.useEffect(() => {
    if (runOnInit && !redirectOnSearch) {
      methods.get(search);
    } else if (redirectOnSearch && search) {
      const { push } = history;
      push(`${redirectOnSearch}${search}`);
    }
  }, [search]);

  return { ...state, ...methods };
};

export const useFilters = ({ coll, fields, query }) => {
  let fieldString = fields
    .map((field) => `fields[]=${field}`)
    .join('&');

  if (query) {
    fieldString += query.replace('?', '&');
  }

  const state = useRest({
    url: `/search?coll=${coll}&${fieldString}`,
    runOnInit: true,
    key: 'filters',
  });

  return {
    ...state,
    getOptions: (name) =>
      get(state, `filters.${name}`, []).map((value) => ({
        label: value,
        value,
      })),
  };
};

export default useRest;

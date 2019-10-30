import React from 'react';
import Axios from 'axios';
import { get, invoke } from 'lodash';
import {
  useNotification,
  useFormHandler,
} from 'q3-ui-forms';
import { makePath } from '../utils';
import reducer from './reducer';
import {
  FETCHING,
  FETCHED,
  CREATED,
  UPDATED,
  DELETED,
} from './constants';

export const getOptions = (url, key, pathToLabel) => {
  return Axios.get(url)
    .then(({ data }) =>
      get(data, key, []).map((i) => ({
        label: get(i, pathToLabel),
        value: i.id,
      })),
    )
    .catch(() => {
      return [];
    });
};

export default ({
  url,
  redirectOnSearch,
  key,
  runOnInit = false,
  strategy = 'formik',
  decorators = {},
  location = {},
  history = {},
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
          onFail(get(err, 'message'));
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
        Axios.post(url, values),
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

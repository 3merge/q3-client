import React from 'react';
import Axios from 'axios';
import { navigate } from '@reach/router';
import { get, invoke } from 'lodash';
import { useFormHandler } from 'q3-ui-forms';
import { makePath, formatUrlPath } from '../helpers';
import reducer from './reducer';
import {
  FETCHING,
  FETCHED,
  CREATED,
  UPDATED,
  DELETED,
  DELETED_MANY,
} from './constants';

const useRest = ({
  url,
  poll,
  redirectOnSearch,
  key,
  pluralized,
  select,
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
        invoke(decorators, 'get', data);

        const resolver = () =>
          new Promise((res) => {
            call(verb, data);
            onComplete(null, actions);
            res(data);
          });

        return poll ? poll().then(resolver) : resolver();
      })
      .catch((err) => {
        onComplete(get(err, 'response.data'), actions);
        return Promise.reject(err);
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
      return Axios.get(formatUrlPath(url, query, select))
        .then(({ data }) => {
          invoke(decorators, 'get', data);
          call(FETCHED, data);
          return Promise.resolve(data);
        })
        .catch((err) => {
          call(FETCHED, null, err);
          return Promise.reject(err);
        });
    },

    poll() {
      return Axios.get(url)
        .then(({ data }) => {
          invoke(decorators, 'get', data);
          call(FETCHED, data);
          return Promise.resolve(data);
        })
        .catch((err) => {
          call(FETCHED, null, err);
          return Promise.reject(err);
        });
    },

    remove(id) {
      return () =>
        Axios.delete(makePath([url, id]))
          .then(() => {
            call(DELETED, { id });
            return poll ? poll() : null;
          })
          .catch((err) => {
            return err;
          });
    },

    removeBulk(ids = []) {
      return Axios.delete(
        `${url}?ids[]=${ids.join('&ids[]=')}`,
      )
        .then(() => {
          call(DELETED_MANY, { ids });
          return poll ? poll() : null;
        })
        .catch((err) => {
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
    const saved = null; // localStorage.getItem(url);
    if (
      !location.search &&
      saved &&
      saved !== 'null' &&
      saved !== 'undefined'
    ) {
      navigate(`?${saved}`);
    } else if (runOnInit && !redirectOnSearch) {
      methods.get(search);
    } else if (redirectOnSearch && search) {
      const { push } = history;
      push(`${redirectOnSearch}${search}`);
    }
  }, [search, url]);

  return { ...state, ...methods };
};

export default useRest;

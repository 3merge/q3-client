import Axios from 'axios';
import {
  isObject,
  isString,
  isFunction,
  get,
  invoke,
} from 'lodash';
import { compose } from 'lodash/fp';
import { makePath, makeQueryPath } from '../helpers';

const useRequest = ({
  namespace,
  actions: { decorators = {}, done, store },
  options: {
    headers = {},
    sendUpdateAsAcknowledgement = false,
    sendUpdateAsFullReceipt = false,
  },
}) => {
  const applyOptionsToUrlString = (str) => {
    const char = String(str).includes('?') ? '&' : '?';
    const exec = (q) => [str, q].join(char);

    if (sendUpdateAsAcknowledgement)
      return exec('acknowledge=true');
    if (sendUpdateAsFullReceipt)
      return exec('fullReceipt=true');

    return str;
  };

  const exec = ({
    callback,
    path,
    method,
    data,
    resolver,
  }) => {
    invoke(decorators, method, data);

    const interceptResponse = (response) => {
      if (sendUpdateAsAcknowledgement)
        return {
          data,
        };

      if (sendUpdateAsFullReceipt)
        return {
          data: {
            [namespace]: get(
              response,
              `data.full.${namespace}`,
            ),
            ...response.data,
          },
        };

      return response;
    };

    const next = isString(resolver)
      ? (payload) => {
          store(resolver, payload);
          return payload;
        }
      : resolver;

    return invoke(Axios, method, path, data, { headers })
      .then(interceptResponse)
      .then(({ data: response }) => {
        invoke(decorators, 'get', response);
        return Promise.resolve(
          done
            ? done().then(() => next(response))
            : next(response),
        ).then(() =>
          isFunction(callback)
            ? callback(response)
            : undefined,
        );
      })
      .catch((err) =>
        Promise.reject(get(err, 'response.data')),
      );
  };

  return {
    exec,

    decoratePathWithFlags: compose(
      applyOptionsToUrlString,
      makePath,
    ),

    decorateQueryPathWithFlags: compose(
      applyOptionsToUrlString,
      makeQueryPath,
    ),

    curry: (args) => (data) => {
      if (!args.data && isObject(data))
        Object.assign(args, {
          data,
        });

      return exec(args);
    },
  };
};

export default useRequest;

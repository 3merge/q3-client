import Axios from 'axios';
import {
  isObject,
  isString,
  isFunction,
  get,
  invoke,
  size,
} from 'lodash';
import { compose } from 'lodash/fp';
import {
  isNotForwardSlash,
  prependForwardSlash,
} from '../helpers';

const hasKeys = (xs) =>
  isObject(xs) && size(Object.keys(xs));

const useRequest = ({
  namespace,
  actions: { decorators = {}, next, store },
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

  const makeUrlPath = (a, b) => {
    let url = Array.isArray(a)
      ? a
          .filter(isNotForwardSlash)
          .map(prependForwardSlash)
          .join('')
      : a;

    if (Array.isArray(b))
      url += `?ids[]=${b.join('&ids[]=')}`;

    return url;
  };

  const exec = ({
    callback,
    path,
    method,
    data,
    resolver,
  }) => {
    const isGet = method === 'get';

    const handleError = (err) =>
      Promise.reject(
        isFunction(callback)
          ? callback(err)
          : get(err, 'response.data'),
      );

    const handleNext = (xs) =>
      isFunction(next)
        ? next(xs).then(() => xs)
        : Promise.resolve(xs);

    const handleSuccess = (response) =>
      isFunction(callback)
        ? callback(null, response)
        : response;

    const invokeGetDecorator = ({ data: response }) => {
      invoke(decorators, 'get', response);
      return response;
    };

    // these options are specific to Q3 subdocument routes
    const interceptResponse = (response) => {
      if (isGet) return response;

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

    // mutate the data through decorators before our rest call
    if (!isGet) invoke(decorators, method, data);

    const params = [method, path];
    if (hasKeys(data)) params.push(data);
    if (hasKeys(headers)) params.push(headers);

    return invoke(Axios, ...params)
      .then(interceptResponse)
      .then(invokeGetDecorator)
      .then(handleNext)
      .then(
        isString(resolver)
          ? (payload) => {
              store(resolver, payload);
              return payload;
            }
          : resolver,
      )
      .then(handleSuccess)
      .catch(handleError);
  };

  return {
    exec,

    assembleUrl: compose(
      applyOptionsToUrlString,
      makeUrlPath,
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

import React from 'react';
import Axios from 'axios';
import {
  compact,
  isFunction,
  invoke,
  get,
  join,
} from 'lodash';
import { compose } from 'lodash/fp';

export const squeeze = compose(
  (xs) => join(xs, ''),
  (...xs) => compact(xs),
);

export const changeContentType = (config) => {
  if (config.data instanceof FormData)
    // eslint-disable-next-line
    config.headers['Content-Type'] = 'multipart/form-data';

  return config;
};

const useRest = ({
  url,
  redirectOnSearch,
  run,
  runOnInit = false,
  history = {},
  location = {},
}) => {
  const search = get(location, 'search', '');

  React.useEffect(() => {
    const req = Axios.interceptors.request.use(
      changeContentType,
    );

    if (runOnInit && !redirectOnSearch && isFunction(run))
      run(search);
    else if (redirectOnSearch && search)
      invoke(
        history,
        'push',
        squeeze(redirectOnSearch, search),
      );

    return () => {
      Axios.interceptors.request.eject(req);
    };
  }, [search, url]);
};

export default useRest;

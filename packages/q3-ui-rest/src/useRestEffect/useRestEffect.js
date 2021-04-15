import React from 'react';
import Axios from 'axios';
import { isFunction, invoke, get } from 'lodash';

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
  const search = get(location, 'search');

  React.useEffect(() => {
    Axios.interceptors.request.use(changeContentType);

    if (runOnInit && !redirectOnSearch && isFunction(run))
      run(search);
    else if (redirectOnSearch && search)
      invoke(
        history,
        'push',
        `${redirectOnSearch}${search}`,
      );
  }, [search, url]);
};

export default useRest;

import React from 'react';
import { debounce } from 'lodash';
import { object } from 'q3-ui-helpers';
import useChangeEvent from '../useChangeEvent';

const useChangeEventListener = (
  name,
  callback,
  timeout = 15000,
) => {
  const { attach, detach } = useChangeEvent(name);

  const handleWatch = debounce((e) => {
    if (callback)
      object.noop(
        callback(window?.location?.search, e?.data),
      );
  }, timeout);

  React.useEffect(() => {
    attach(handleWatch);
    return () => {
      detach(handleWatch);
      handleWatch.cancel();
    };
  }, [name]);
};

export default useChangeEventListener;

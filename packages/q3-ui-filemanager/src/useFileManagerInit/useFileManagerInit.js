import React from 'react';
import { object } from 'q3-ui-helpers';
import { isFunction } from 'lodash';

export const useFileManagerInit = (
  authInstance,
  next,
  recurring,
) => {
  const ref = React.useRef();
  const [init, setInit] = React.useState(false);
  const setInitTruthy = () => setInit(true);

  React.useEffect(() => {
    if (authInstance.canSee) {
      object.noop(next()).then(setInitTruthy);

      if (isFunction(recurring))
        ref.current = setInterval(() => {
          recurring();
        }, 15000);
    } else setInitTruthy();

    return () => {
      setInit(false);
      if (ref.current) {
        clearInterval(recurring);
      }
    };
  }, []);

  return init;
};

export default useFileManagerInit;

import React from 'react';
import { object } from 'q3-ui-helpers';

export const useFileManagerInit = (authInstance, next) => {
  const [init, setInit] = React.useState(false);
  const setInitTruthy = () => setInit(true);

  React.useEffect(() => {
    if (authInstance.canSee)
      object.noop(next()).then(setInitTruthy);
    else setInitTruthy();

    return () => {
      setInit(false);
    };
  }, []);

  return init;
};

export default useFileManagerInit;

import React from 'react';
import useRest from 'q3-ui-rest';
import { get, size } from 'lodash';
import { Store } from '../containers/state';

export const checkError = (xs, restState = {}) =>
  Boolean(
    !restState.fetching &&
      (!size(xs) || restState.fetchingError),
  );

const useRestWithStore = (callback) => {
  const store = React.useContext(Store);
  const restProps = callback(store);

  const restState = useRest({
    runOnInit: true,
    ...restProps,
  });

  const data = get(restState, restProps.pluralized, []);
  const { fetching = false, poll } = restState;

  return {
    data,
    error: checkError(data, restState),
    loading: fetching,
    poll,
  };
};

export default useRestWithStore;

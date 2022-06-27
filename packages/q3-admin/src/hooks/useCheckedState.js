import React from 'react';
import { get } from 'lodash';
import { State } from 'q3-ui-exports';

const useCheckedState = () => {
  const exportState = React.useContext(State);
  return get(exportState, 'checked');
};

export default useCheckedState;

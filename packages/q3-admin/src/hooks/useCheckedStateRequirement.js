import React from 'react';
import { get, size } from 'lodash';
import { State } from 'q3-ui-exports';

const useCheckedStateRequirement = () => {
  const exportState = React.useContext(State);
  const checked = get(exportState, 'checked');
  return size(checked) > 0;
};

export default useCheckedStateRequirement;

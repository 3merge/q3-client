import { size } from 'lodash';

import useCheckedState from './useCheckedState';

const useCheckedStateRequirement = () =>
  size(useCheckedState()) > 0;

export default useCheckedStateRequirement;

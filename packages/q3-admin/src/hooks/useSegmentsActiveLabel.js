import { get } from 'lodash';
import useSegmentsActive from './useSegmentsActive';

const useSegmentsActiveLabel = () =>
  get(useSegmentsActive(), 'active');

export default useSegmentsActiveLabel;

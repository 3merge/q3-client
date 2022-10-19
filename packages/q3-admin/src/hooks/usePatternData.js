import { isFunction, isString } from 'lodash';
import useReportById from './useReportById';
import useRestWithStore from './useRestWithStore';

const usePatternData = ({ apiParams, report }) => {
  if (isString(report)) return useReportById(report);
  if (isFunction(apiParams))
    return useRestWithStore(apiParams);

  return {
    fetching: false,
    fetchingError: true,
  };
};

export default usePatternData;

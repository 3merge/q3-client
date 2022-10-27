import React from 'react';
import { isFunction, isString, pick } from 'lodash';
import { object } from 'q3-ui-helpers';
import useReportById from './useReportById';
import useRestWithStore from './useRestWithStore';
import { Store } from '../containers/state';

const usePatternData = ({ apiParams, report, refresh }) => {
  const { data } = React.useContext(Store);
  const ref = React.useRef();

  const effectDeps = Array.isArray(refresh)
    ? [object.toJSON(pick(data, refresh))]
    : [];

  const returnAndAssignToRef = (output) => {
    ref.current = output;
    return output;
  };

  React.useEffect(() => {
    if (
      !ref?.current?.loading &&
      isFunction(ref?.current?.poll)
    )
      ref.current.poll();
  }, effectDeps);

  if (isString(report))
    return returnAndAssignToRef(useReportById(report));

  if (isFunction(apiParams))
    return returnAndAssignToRef(
      useRestWithStore(apiParams),
    );

  return {
    fetching: false,
    fetchingError: true,
  };
};

export default usePatternData;

import React from 'react';
import useRest from 'q3-ui-rest';
import { Definitions } from '../containers/state';
import { checkError } from './useRestWithStore';

const useReportById = (template) => {
  const restState = useRest({
    key: 'data',
    pluralized: 'data',
    runOnInit: true,
    url: `/reports?template=${template}&id=${
      React.useContext(Definitions).id
    }`,
  });

  const { data, fetching: loading } = restState;

  return {
    data,
    error: checkError(data, restState),
    loading,
  };
};

export default useReportById;

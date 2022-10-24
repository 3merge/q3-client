import useRest from 'q3-ui-rest';
import { useQueryParams } from 'q3-ui-queryparams';
import { checkError } from './useRestWithStore';

const useReport = (template, query = {}) => {
  const { encode } = useQueryParams();
  const restState = useRest({
    key: 'data',
    pluralized: 'data',
    runOnInit: true,
    url: `/reports${encode({
      ...query,
      template,
    })}`,
  });

  const { data, fetching: loading } = restState;

  return {
    data,
    error: checkError(data, restState),
    loading,
  };
};

export default useReport;

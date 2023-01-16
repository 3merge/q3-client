import useRest from 'q3-ui-rest';
import { useQueryParams } from 'q3-ui-queryparams';
import { checkError } from './useRestWithStore';

const useReport = (template, query = {}) => {
  const { encode } = useQueryParams();
  const location = {
    search: encode({
      ...query,
      template,
    }),
  };

  const restState = useRest({
    key: 'data',
    pluralized: 'data',
    runOnInit: true,
    url: '/reports',
    location,
  });

  const { data, fetching: loading, poll } = restState;

  return {
    data,
    error: checkError(data, restState),
    loading,
    poll() {
      // make sure we have the query string
      return poll(location?.search);
    },
  };
};

export default useReport;

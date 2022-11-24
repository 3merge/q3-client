import { useActiveQueryParams } from 'q3-ui-queryparams';
import { reduce } from 'lodash';

const useActiveSearchQuery = () =>
  reduce(
    useActiveQueryParams(),
    (acc, curr) => {
      if (acc[curr.name])
        acc[curr.name] = [
          acc[curr.name],
          curr.value,
        ].flat();
      else acc[curr.name] = curr.value;
      return acc;
    },
    {},
  );

export default useActiveSearchQuery;

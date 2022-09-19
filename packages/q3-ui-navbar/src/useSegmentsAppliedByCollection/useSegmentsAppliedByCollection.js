import { reduce, last, get } from 'lodash';
import useSegmentsStructuredTree from '../useSegmentsStructuredTree';

const useSegmentsAppliedByCollection = (collectionName) => {
  const segments = get(
    useSegmentsStructuredTree(),
    collectionName,
  );

  const getAppliedSegments = (xs) =>
    reduce(
      xs,
      (acc, curr) => {
        if (!curr.applied) return acc;
        if (curr.folder)
          return acc.concat(
            getAppliedSegments(curr.segments),
          );

        return acc.concat(curr);
      },
      [],
    );

  return last(getAppliedSegments(segments));
};

export default useSegmentsAppliedByCollection;

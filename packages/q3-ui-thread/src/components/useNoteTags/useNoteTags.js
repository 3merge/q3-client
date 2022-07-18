import React from 'react';
import { uniq, compact, map, includes } from 'lodash';

const useNoteTags = (xs) =>
  React.useMemo(
    () =>
      map(
        uniq(compact(map(xs, 'tags').flat())),
        String,
      ).sort(),
    [],
  );

export default useNoteTags;

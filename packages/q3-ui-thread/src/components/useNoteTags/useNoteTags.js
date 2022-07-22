import React from 'react';
import { uniq, compact, map } from 'lodash';
import ThreadContextHttp from '../ThreadContextHttp';

const useNoteTags = () => {
  const { thread } = React.useContext(ThreadContextHttp);
  const data = map(thread, (item) =>
    map(item.tags, String),
  );

  return React.useMemo(
    () =>
      Array.isArray(data)
        ? uniq(compact(data.flat())).sort()
        : data,
    [data],
  );
};

export default useNoteTags;

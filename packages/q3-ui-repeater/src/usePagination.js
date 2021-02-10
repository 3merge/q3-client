import React from 'react';
import { size } from 'lodash';

export const slicer = (cur, per, xs) => {
  const base = cur * per - per;
  return [].concat(xs).slice(base, base + per);
};

const usePagination = (perPage, xs) => {
  const [page, setPage] = React.useState(1);
  const onChange = (_, num) => setPage(num);
  const total = size(xs);

  React.useEffect(() => {
    setPage(1);
  }, [xs]);

  return {
    page,
    list: slicer(page, perPage, xs),
    totalPage: Math.ceil(size(xs) / perPage),
    currentPage: page + 1,
    total,
    onChange,
  };
};

export default usePagination;

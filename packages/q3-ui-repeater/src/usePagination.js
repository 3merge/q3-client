import React from 'react';

export const slicer = (cur, per, xs) => {
  const base = cur * per - per;
  return xs.slice(base, base + per);
};

const usePagination = (perPage, xs) => {
  const [page, setPage] = React.useState(1);
  const onChange = (_, num) => setPage(num);

  return {
    totalPage: Math.ceil(xs.length / perPage),
    currentPage: page + 1,
    list: slicer(page, perPage, xs),
    onChange,
  };
};

export default usePagination;

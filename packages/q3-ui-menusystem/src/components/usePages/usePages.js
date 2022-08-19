import { find, first, reduce, size } from 'lodash';

const cleanPageEntries = (a = []) =>
  reduce(
    a,
    (acc, curr) => {
      if (curr.href) acc.push(curr);
      else if (size(curr.pages))
        acc.push({
          ...curr,
          pages: cleanPageEntries(curr.pages),
        });

      return acc;
    },
    [],
  );

const selectActiveParent = (a = []) =>
  find(a, 'active') || first(a);

const usePages = (xs = []) => {
  const pages = cleanPageEntries(xs);
  const initialSelectedParent = selectActiveParent(pages);

  return {
    initialSelectedParent,
    pages,
  };
};

export default usePages;

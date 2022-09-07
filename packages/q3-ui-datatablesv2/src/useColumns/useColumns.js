import { pick, reduce, split, uniqBy } from 'lodash';

const useColumns = (columns, data = []) =>
  reduce(
    columns,
    (acc, curr) => {
      const getValue = (row) => {
        const keys = split(curr?.field, ',');
        return keys.length > 1
          ? pick(row, keys)
          : row[keys[0]];
      };

      // should only look for null, undefined or empty string
      // false is OK
      if (curr.visible && data.some(getValue))
        acc.push({
          ...curr,

          getValue,
        });

      return uniqBy(acc, 'field');
    },
    [],
  );

export default useColumns;

import { first, pick, reduce, split } from 'lodash';

const useColumns = (columns, data = []) =>
  reduce(
    columns,
    (acc, curr) => {
      const getValue = (row) => {
        const { field, format } = curr;
        const keys = split(field, ',');
        const d = pick(row, keys);

        return (
          {
            array: Object.values(d),
            object: d,
            undefined: d[first(Object.keys(d))],
          }[String(format)] || ''
        );
      };

      // should only look for null, undefined or empty string
      // false is OK
      if (curr.visible && data.some(getValue))
        acc.push({
          ...curr,
          getValue,
        });

      return acc;
    },
    [],
  );

export default useColumns;

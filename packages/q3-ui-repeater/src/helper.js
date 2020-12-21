import { array } from 'q3-ui-helpers';

const testSearchTerm = (val) => (item) =>
  !val.length ||
  new RegExp(val, 'gi').test(JSON.stringify(item));

export const filter = (searchTerm) => (xs) =>
  searchTerm ? xs.filter(testSearchTerm(searchTerm)) : xs;

export const sort = (obj) => (xs) => {
  if (!array.hasLength(xs) || !obj) return xs;
  const { sortBy, fn = null } = obj;
  const callback =
    typeof xs[0][sortBy] === 'string'
      ? fn || ((a, b) => a[sortBy].localeCompare(b[sortBy]))
      : fn || ((a, b) => a[sortBy] - b[sortBy]);

  return xs.slice().sort(callback);
};

const OTHER = 'other';

export const group = (obj) => (xs) =>
  !array.hasLength(xs) || !obj
    ? xs
    : xs.reduce(
        (acc, x) => {
          // eslint-disable-next-line mdx/no-unused-expressions
          obj.fn(x)
            ? acc[obj.label].push(x)
            : acc[OTHER].push(x);
          return acc;
        },
        { [obj.label]: [], [OTHER]: [] },
      );

export const genNewShape = (groupBy) => {
  const base = groupBy.reduce((acc, option) => {
    acc[option.label] = [];
    return acc;
  }, {});
  return { ...base, [OTHER]: [] };
};

export const wouldWork = (groupBy) => (xs) => {
  const empty = genNewShape(groupBy);

  return xs.reduce((acc, x) => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < groupBy.length; i++) {
      const { label, fn } = groupBy[i];
      if (groupBy.length === i + 1) {
        // eslint-disable-next-line mdx/no-unused-expressions
        fn(x) ? acc[label].push(x) : acc[OTHER].push(x);
        break;
      }
      if (fn(x)) {
        acc[label].push(x);
        break;
      }
    }
    // eslint-disable-next-line consistent-return
    return acc;
  }, empty);
};

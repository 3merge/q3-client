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

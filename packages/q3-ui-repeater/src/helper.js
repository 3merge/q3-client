export const sort = ({ sortBy, customFn = null }, xs) => {
  const callback =
    typeof xs[0][sortBy] === 'string'
      ? customFn ||
        ((a, b) => a[sortBy].localeCompare(b[sortBy]))
      : customFn || ((a, b) => a[sortBy] - b[sortBy]);

  return xs.slice().sort(callback);
};

export const group = ({ label, fn }, xs) =>
  xs.reduce(
    (acc, x) => {
      // eslint-disable-next-line mdx/no-unused-expressions
      fn(x) ? acc[label].push(x) : acc.rest.push(x);
      return acc;
    },
    { [label]: [], rest: [] },
  );

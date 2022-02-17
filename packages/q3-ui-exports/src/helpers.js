export const renameKeys = (o = {}, mutator) =>
  Object.entries(o).reduce(
    (acc, [key, value]) =>
      Object.assign(acc, {
        [mutator(key)]: value,
      }),
    {},
  );

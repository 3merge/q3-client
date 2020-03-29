export const hasKeys = (o) =>
  o !== null &&
  typeof o === 'object' &&
  Object.keys(o).length > 0;

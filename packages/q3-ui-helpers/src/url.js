const isString = (v = '') =>
  typeof v === 'string' ? v : String(v);

export const checksArray = (name) =>
  name &&
  (name.endsWith('.') ||
    name.endsWith('.0') ||
    name.endsWith('%2E0'))
    ? `${name.replace('.', '%2Elength')}`
    : name;

export const decode = (name) =>
  isString(name)
    .replace('%2E', '.')
    .replace('length', '0')
    .replace('%21', '!');

export const encode = (name) =>
  isString(name)
    .replace(/[^a-zA-Z0-9 !%.]/g, '')
    .replace('.', '%2E')
    .replace('!', '%21')
    .replace('%2E0', '%2Elength');

import { pick } from 'lodash';

export const getFn = (obj, prop) =>
  prop in obj ? obj[prop]() : new Error('Unknown action');

export const isEmpty = (obj) =>
  obj ? !Object.keys(obj).length : true;

export const extractValue = (a) => a.map((b) => b.value);

export const pickForPatch = (a, b) =>
  pick(a, Object.keys(b));

export const makePath = (a = []) =>
  a
    .filter((b) => b && b !== '/')
    .map((b) => {
      const str = String(b);
      const { length } = str;
      const lastChar = str.substr(-1);
      return lastChar === '/'
        ? str.substring(length - 1)
        : str;
    })
    .join('/');

export const pluralize = (name = '') => {
  const { length } = name;
  const lastChar = length - 1;
  if (name.charAt(lastChar) === 'y') {
    return `${name.substring(0, lastChar)}ies`;
  }
  return `${name}s`;
};

export const generatePaths = (pathToName) => {
  const [pathToData] = pathToName.split('.');
  return {
    pathToRest: `/${pluralize(pathToData)}`,
    pathToData,
    pathToName,
  };
};

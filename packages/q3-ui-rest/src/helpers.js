import axios from 'axios';
import FileDownload from 'js-file-download';
import { get } from 'lodash';

const isNotForwardSlash = (v) => v && v !== '/';

const prependForwardSlash = (v) => {
  let output = String(v);
  if (output.startsWith('/')) output = output.substr(1);

  if (output.charAt(output.length - 1) === '/')
    output = output.substring(0, output.length - 1);

  return `/${output}`;
};

export const getFn = (obj, prop) => {
  if (!(prop in obj) || typeof obj[prop] !== 'function')
    throw new Error('Unknown action');

  return obj[prop]();
};

export const isEmpty = (obj) =>
  !obj ||
  (typeof obj === 'object' &&
    !Object.keys(obj).length &&
    !(obj instanceof Error));

export const makePath = (a = []) =>
  a
    .filter(isNotForwardSlash)
    .map(prependForwardSlash)
    .join('');

const extractData = (v, path) => {
  const data = get(v, path);

  return data
    ? {
        label: data,
        value: v.id,
        ...v,
      }
    : {
        label: data,
        value: data,
      };
};

export const addSearchQuery = (v, term) =>
  v.includes('?')
    ? `${v}&search=${term}`
    : `${v}?search=${term}`;

export const getOptions = (
  url,
  key,
  pathToLabel,
  flatten = false,
) =>
  axios
    .get(url)
    .then(({ data }) =>
      pathToLabel
        ? get(data, key, []).map((i) =>
            flatten
              ? get(i, pathToLabel)
              : extractData(i, pathToLabel),
          )
        : get(data, key, []),
    )
    .catch(() => {
      return [];
    });

export const acceptCsvFiletype = (params) => (
  data,
  headers,
) => {
  Object.assign(headers, params, {
    'Accept': 'text/csv',
  });
  return data;
};

export const getAsCSV = (url, params = {}) =>
  axios({
    url,
    method: 'get',
    transformRequest: [acceptCsvFiletype(params)],
  })
    .then((e) => {
      FileDownload(e.data, 'file.csv');
    })
    .catch(() => {
      // noop
    });

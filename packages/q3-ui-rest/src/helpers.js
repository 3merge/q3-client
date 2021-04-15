import axios from 'axios';
import FileDownload from 'js-file-download';

export const isNotForwardSlash = (v) => v && v !== '/';

export const prependForwardSlash = (v) => {
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

export const makeUrlPath = (a, b) => {
  let url = Array.isArray(a)
    ? a
        .filter(isNotForwardSlash)
        .map(prependForwardSlash)
        .join('')
    : a;

  if (Array.isArray(b))
    url += `?ids[]=${b.join('&ids[]=')}`;

  return url;
};

export const addSearchQuery = (v, term) =>
  v.includes('?')
    ? `${v}&search=${term}`
    : `${v}?search=${term}`;

export const acceptCsvFiletype = (params = {}) => (
  data,
  headers,
) => {
  Object.assign(headers, params, {
    'Accept': 'text/csv',
  });
  return data;
};

export const getWithContentTypeCsv = (url, params) =>
  axios({
    url,
    method: 'get',
    transformRequest: [acceptCsvFiletype(params)],
  });

export const getAsCSV = (url, params = {}) =>
  getWithContentTypeCsv(url, params)
    .then((e) => FileDownload(e.data, 'file.csv'))
    .catch(() => {
      // noop
    });

export const formatUrlPath = (url, query, select) => {
  let endpoint = url;

  const hasQuery = (v) => v.includes('?');
  const appendAmpersand = (v) =>
    v.startsWith('&') ? v : `&${v}`;

  const hasLength = (v) =>
    typeof v === 'string' && v.length;

  const addToEndpoint = (v) => {
    if (hasQuery(endpoint)) {
      endpoint += appendAmpersand(v.replace('?', '&'));
    } else if (v.startsWith('&')) {
      endpoint += endpoint.endsWith('&') ? v.substr(1) : v;
    } else {
      endpoint += !v.startsWith('?') ? `?${v}` : v;
    }
  };

  if (hasLength(query)) addToEndpoint(query);
  if (hasLength(select)) addToEndpoint(`fields=${select}`);

  return endpoint;
};

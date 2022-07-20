import {
  isString,
  last,
  get,
  some,
  replace,
  isObject,
} from 'lodash';
import { browser } from 'q3-ui-helpers';

export const checkSsr =
  (fn) =>
  (...params) =>
    browser.isBrowserReady() ? fn(...params) : null;

export const checkContains = (selector, target) =>
  browser.isBrowserReady()
    ? some(document.querySelectorAll(selector), (node) =>
        node.contains(target),
      )
    : true;

export const getFileType = (url) => {
  if (!url || !isString(url) || !String(url).includes('.'))
    return null;

  // Extension starts after the first dot after the last slash
  const extStart = url.indexOf(
    '.',
    url.lastIndexOf('/') + 1,
  );
  if (extStart === -1) return null;
  const ext = url.substr(extStart + 1);
  // end of extension must be one of: end-of-string or question-mark or hash-mark
  const extEnd = ext.search(/$|[?#]/);
  return ext.substring(0, extEnd).toLowerCase();
};

export const normalize = (xs) =>
  ['', 'null', 'undefined'].includes(String(xs))
    ? null
    : xs;

export const getLastFolder = (str) =>
  last(String(str).split('/'));

export const convertSlashIntoDotNotation = (str) =>
  replace(str, /\//g, '.');

export const makePrivateKey = (str = undefined) =>
  isString(str) ? `__${getLastFolder(str)}__` : '__null__';

export const makeDirectoryId = (path = '', xs = {}) => {
  const recursivelyGetIds = (ob) => {
    if (Array.isArray(ob))
      return ob.flatMap((v) => get(v, 'id'));

    return isObject(ob)
      ? Object.values(ob).flatMap(recursivelyGetIds)
      : [];
  };

  return recursivelyGetIds(
    get(xs, convertSlashIntoDotNotation(path), {}),
  )
    .flat()
    .sort()
    .join(',');
};
export const toMbs = (bytes = 0) =>
  `${Number(bytes / 1024 ** 2).toFixed(2)}mbs`;

export const toPixels = (pixels) => `${pixels}px`;

export const sanitize = (s) => {
  if (!isString(s)) return undefined;
  const punctuationless = s.replace(
    /[.,/#!$%^&*;:{}=\-_`~()]/g,
    '',
  );

  return punctuationless.replace(/\s{2,}/g, ' ');
};

export const withQueryParamIds = (str) =>
  String(str).includes(',') ? `?ids=${str}` : str;

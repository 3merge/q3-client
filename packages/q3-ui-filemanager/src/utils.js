import {
  isString,
  last,
  get,
  some,
  replace,
  isObject,
  isNil,
  isFunction,
} from 'lodash';
import { browser } from 'q3-ui-helpers';

export const checkSsr =
  (fn) =>
  (...params) =>
    browser.isBrowserReady() ? fn(...params) : null;

export const castPropertyToLowerCase =
  (propertyName) => (item) =>
    String(get(item, propertyName)).toLowerCase();

export const checkContains = (selector, target) =>
  browser.isBrowserReady()
    ? some(document.querySelectorAll(selector), (node) =>
        node.contains(target),
      )
    : true;

export const getFileType = (url) => {
  const defaultValue = null;
  try {
    return (
      last(new URL(url).pathname.split('.')) || defaultValue
    );
  } catch (e) {
    return defaultValue;
  }
};

export const normalize = (xs) =>
  ['', 'null', 'undefined'].includes(String(xs))
    ? null
    : xs;

export const getLastFolder = (str) =>
  last(String(str).split('/'));

export const suppressEvent = (e, fn) => {
  if (isObject(e)) {
    e.preventDefault();
    e.stopPropagation();
  }

  fn(e);
};

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

export const getKey = (k) => `q3-filemanager-${k}`;

export const getFromLocalStorage = (k, defaultValue) => {
  const prev = browser.proxyLocalStorageApi(
    'getItem',
    getKey(k),
  );

  return isNil(normalize(prev)) ? defaultValue : prev;
};

export const isTouchDevice = () =>
  browser.isBrowserReady() &&
  isFunction(window.matchMedia) &&
  window.matchMedia('(pointer: coarse)')?.matches;

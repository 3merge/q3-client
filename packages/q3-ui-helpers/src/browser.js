import { invoke } from 'lodash';
import { navigate } from '@reach/router';

export const isBrowserReady = () =>
  typeof window !== 'undefined';

export const isDefined = (v) =>
  v !== undefined &&
  v !== null &&
  v !== 'null' &&
  v !== 'undefined';

export const proxyLocalStorageApi = (method, ...args) =>
  isBrowserReady()
    ? invoke(window.localStorage, method, ...args)
    : null;

export const proxySessionStorageApi = (method, ...args) =>
  isBrowserReady()
    ? invoke(window.sessionStorage, method, ...args)
    : null;

export const redirectIn = (path = '/', interval = 2000) =>
  setTimeout(() => {
    navigate(path);
  }, [interval]);

export const isOverflownHorizontal = ({
  clientWidth,
  scrollWidth,
}) => scrollWidth > clientWidth;

export const isOverflownVertical = ({
  clientHeight,
  scrollHeight,
}) => scrollHeight > clientHeight;

export const isOverflown = (el) =>
  isOverflownVertical(el) || isOverflownHorizontal(el);

export const getFileThumbnail = (file, callback) => {
  const reader = new FileReader();

  if (file) {
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      callback(null, e.currentTarget.result);
    };

    reader.onerror = (e) => {
      callback(e);
    };
  }
};

export const copyToClipboard = (str) => {
  if (isBrowserReady()) {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }
};

export const fetchJson = (uri) =>
  fetch(uri).then((resp) => resp.json());

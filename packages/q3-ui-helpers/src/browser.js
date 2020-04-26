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
  setTimeout(() => navigate(path), [interval]);

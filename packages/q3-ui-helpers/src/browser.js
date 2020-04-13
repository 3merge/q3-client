import { invoke } from 'lodash';

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

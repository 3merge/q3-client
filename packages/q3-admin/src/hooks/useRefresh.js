import React from 'react';
import { throttle } from 'lodash';
import { browser } from 'q3-ui-helpers';
import { Definitions } from '../containers/state';
import { SocketContext } from '../containers/Socket';

const REFRESH_NAME = 'Q3_REFRESH';

const noop = () => null;
const joinIds = (a = []) => a.map(({ id }) => id).join(',');

const addToStorage = (data) => {
  if (Array.isArray(data))
    browser.proxySessionStorageApi(
      'setItem',
      REFRESH_NAME,
      joinIds(data),
    );
};

const hasInStorage = (refreshId) => {
  const s = browser.proxySessionStorageApi(
    'getItem',
    REFRESH_NAME,
  );

  return typeof s === 'string'
    ? s.includes(refreshId)
    : false;
};

const removeFromStorage = () =>
  browser.proxySessionStorageApi(
    'removeItem',
    REFRESH_NAME,
  );

export default (onChange, data) => {
  const ctx = React.useContext(SocketContext);
  if (!ctx || !ctx.join) return;

  const { join, leave, watch } = ctx;
  const { collectionName, id } = React.useContext(
    Definitions,
  );

  const args = { collectionName };

  let fn = onChange;

  const handleWatch = throttle(
    (refreshId) =>
      fn &&
      browser.isBrowserReady() &&
      hasInStorage(refreshId)
        ? fn(window.location.search).then(noop).catch(noop)
        : null,
    1500,
  );

  React.useEffect(() => {
    addToStorage(data);
    return removeFromStorage;
  }, [data]);

  React.useEffect(() => {
    if (id) return undefined;

    join(args);
    watch(handleWatch);

    return () => {
      leave(args);
      handleWatch.cancel();
      fn = null;
    };
  }, [collectionName, id]);
};

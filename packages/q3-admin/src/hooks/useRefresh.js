import React from 'react';
import { debounce } from 'lodash';
import { browser } from 'q3-ui-helpers';
import { Definitions } from '../containers/state';
import { SocketContext } from '../containers/Socket';

const noop = () => null;

export default (onChange, debounceValue = 15000) => {
  const ctx = React.useContext(SocketContext);
  if (!ctx || !ctx.join) return;

  const { join, leave, watch } = ctx;
  const { collectionName, id } = React.useContext(
    Definitions,
  );

  const args = { collectionName };

  let fn = onChange;

  const handleWatch = debounce(
    () =>
      fn && browser.isBrowserReady()
        ? fn(window.location.search).then(noop).catch(noop)
        : null,
    debounceValue,
  );

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

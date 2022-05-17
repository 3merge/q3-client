import React from 'react';
import { invoke, map } from 'lodash';
import useDatatableActionsIo from './useDatatableActionsIo';
import { Store } from '../containers/state';

const useDatatableActions = (io = {}) => {
  const moreOptions = invoke(
    io,
    'renderer',
    React.useContext(Store)?.data,
  );

  const { exportCollection, importCollection } =
    useDatatableActionsIo();

  const withForwardClick = (xs, fn) =>
    map(xs, (item) => ({
      label: item,
      onClick(ctx) {
        return fn(item, ctx);
      },
    }));

  return {
    exportOptions: withForwardClick(
      io.exports,
      exportCollection,
    ),

    importOptions: withForwardClick(
      io.imports,
      importCollection,
    ),

    // renderer func?
    moreOptions: Array.isArray(moreOptions)
      ? moreOptions
      : [],
  };
};

export default useDatatableActions;

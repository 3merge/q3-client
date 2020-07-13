import React from 'react';
import { array, browser } from 'q3-ui-helpers';

const getColumnsFromLocalStorage = (key, fallback = []) => {
  const str = browser.proxyLocalStorageApi('getItem', key);
  return typeof str === 'string' && str !== 'undefined'
    ? str.split(',')
    : fallback;
};

const saveColumnsToLocalStorage = (key, values) => {
  if (!Array.isArray(values)) return;
  browser.proxyLocalStorageApi(
    'setItem',
    key,
    values.join(','),
  );
};

export default (id, defaultColumns, allColumns) => {
  const key = `q3-datatables-column-${id}`;
  const [active, setActive] = React.useState(
    getColumnsFromLocalStorage(key, defaultColumns),
  );

  return {
    activeColumns: active,
    columns: array.mergeUnique(defaultColumns, allColumns),

    setColumns: (values) => {
      saveColumnsToLocalStorage(key, values);
      setActive(values);
    },
  };
};

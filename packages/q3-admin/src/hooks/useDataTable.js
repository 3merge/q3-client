import React from 'react';
import { compact, map, find } from 'lodash';
import { Definitions } from '../containers/state';

const useDataTable = () => {
  const { columns, updateSys } =
    React.useContext(Definitions);

  return {
    onColumnAdd(field) {
      return updateSys({
        columns: columns.concat({
          field,
          visible: true,
        }),
      });
    },
    onColumnChange(field, defs = {}) {
      return updateSys({
        columns: columns.map((column) =>
          column.field === field
            ? {
                ...column,
                ...defs,
              }
            : column,
        ),
      });
    },
    onColumnReorder(fieldOrder = []) {
      return updateSys({
        columns: compact(
          map(fieldOrder, (field) =>
            find(
              columns,
              (column) => column.field === field,
            ),
          ),
        ),
      });
    },
  };
};

export default useDataTable;

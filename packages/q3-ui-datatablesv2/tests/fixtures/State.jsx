import React from 'react';
import { sortBy, uniqBy } from 'lodash';
import { green } from '@material-ui/core/colors';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import columns from './columns';
import data from './data';

const State = ({ children }) => {
  const [localColumns, setLocalColumns] = React.useState(
    uniqBy(columns, 'field').map((column, idx) => ({
      ...column,
      seq: idx,
    })),
  );

  const onColumnChange = (field, args) => {
    setLocalColumns((prevState) => {
      const output = prevState.map((item) => {
        if (item.field === field) {
          return {
            ...item,
            ...args,
          };
        }

        return item;
      });

      return output;
    });
  };

  const onColumnAdd = (field) =>
    setLocalColumns((prevState) =>
      prevState.concat({
        field,
        visible: true,
      }),
    );

  const onColumnReorder = (fields) => {
    setLocalColumns((prevState) =>
      prevState.map((item) => ({
        ...item,
        seq: fields.findIndex(
          (field) => field === item.field,
        ),
      })),
    );
  };

  return children({
    columns: sortBy(localColumns, 'seq'),
    data,
    onColumnAdd,
    onColumnChange,
    onColumnReorder,
    iconMap: {
      Paid: 'AccountBalanceWallet',
    },
    colorMap: {
      Paid: 'green',
    },
  });
};

export default State;

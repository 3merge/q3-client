import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import { Formatter } from 'q3-components';

const Cell = ({ id, value, className, ...props }) => {
  return (
    <TableCell {...props} id={id} className={className}>
      <div>
        <Formatter value={value} />
      </div>
    </TableCell>
  );
};

export default Cell;

import React from 'react';
import { map, orderBy } from 'lodash';
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@material-ui/core';
import TimelineEntry from '../TimelineEntry';

export default ({ data }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell component="th" style={{ padding: 4 }}>
          Operation
        </TableCell>
        <TableCell component="th">User</TableCell>
        <TableCell component="th">Entity</TableCell>
        <TableCell component="th">Date</TableCell>
        <TableCell />
      </TableRow>
    </TableHead>
    <TableBody>
      {map(
        orderBy(data, ['date'], ['desc']),
        (item, idx) => (
          <TimelineEntry
            key={`${item.date}-${idx}`}
            {...item}
          />
        ),
      )}
    </TableBody>
  </Table>
);

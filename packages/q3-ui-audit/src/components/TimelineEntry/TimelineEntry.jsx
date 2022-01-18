import React from 'react';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import { object } from 'q3-ui-helpers';
// eslint-disable-next-line
import flat from 'flat';
import useStyle from './styles';

const TimelineEntry = (props) => {
  const cls = useStyle();

  return object.hasKeys(props) ? (
    <div className="q3-ui-audit-entry">
      <Table className={cls.table}>
        <TableBody>
          {Object.entries(flat(props)).map(([k, v]) => (
            <TableRow key={k}>
              <TableCell
                component="th"
                className={cls.cellHead}
              >
                {k}
              </TableCell>
              <TableCell className={cls.cell}>
                {String(v)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ) : null;
};

TimelineEntry.defaultProps = {};
TimelineEntry.propTypes = {};

export default TimelineEntry;

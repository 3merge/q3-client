import React from 'react';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import { object } from 'q3-ui-helpers';
import { useTranslation } from 'q3-ui-locale';
import flat from 'flat';
import useStyle from './styles';

const TimelineEntry = (props) => {
  const { t } = useTranslation('labels');
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
                {t(k)}:
              </TableCell>
              <TableCell className={cls.cell}>
                {v}
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

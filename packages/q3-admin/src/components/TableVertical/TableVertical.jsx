import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Box,
} from '@material-ui/core';
import { useTranslation } from 'q3-ui-locale';
import { string } from 'q3-ui-helpers';
import { get, join, size } from 'lodash';
import { connect } from '../../containers';
import useStyle from './styles';

const TableVertical = ({ data, columns }) => {
  const cls = useStyle();
  const { t } = useTranslation('labels');

  const format = (rawValue, formatter) => {
    const is = (str) => str === formatter;

    if (is('price')) return string.toPrice(rawValue);
    if (is('multiline')) return join(rawValue, '\n');
    if (is('datetime')) return string.toDate(rawValue);
    if (is('count')) return size(rawValue);
    return rawValue || '--';
  };

  return (
    <Box cls={cls.box}>
      <Table className={cls.table}>
        <TableBody>
          {columns.map(({ field, formatter, label }) => (
            <TableRow key={field}>
              <TableCell component="th">
                {t(label || field)}
              </TableCell>
              <TableCell>
                {format(get(data, field), formatter)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

TableVertical.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string,
      label: PropTypes.string,
      formatter: PropTypes.string,
    }),
  ).isRequired,
  data: PropTypes.shape({}).isRequired,
};

export default connect(TableVertical);

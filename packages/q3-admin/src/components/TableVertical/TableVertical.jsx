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
import { useHelperFormats } from 'q3-ui-helpers/lib/hooks';
import { merge, map } from 'lodash';
import { connect } from '../../containers';
import useStyle from './styles';

const TableVertical = ({ columns, data, fields }) => {
  const cls = useStyle();
  const { t } = useTranslation('labels');
  const format = useHelperFormats(data);

  return (
    <Box cls={cls.box}>
      <Table className={cls.table}>
        <TableBody>
          {map(
            merge(columns, fields),
            ({ field, formatter, label }) => (
              <TableRow key={field}>
                <TableCell component="th">
                  {t(label || field)}
                </TableCell>
                <TableCell>
                  {format(field, formatter)}
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </Box>
  );
};

TableVertical.defaultProps = {
  columns: [],
  fields: [],
};

TableVertical.propTypes = {
  /**
   * Deprecated.
   */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string,
      label: PropTypes.string,
      formatter: PropTypes.string,
    }),
  ),
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string,
      label: PropTypes.string,
      formatter: PropTypes.string,
    }),
  ),
  data: PropTypes.shape({}).isRequired,
};

export default connect(TableVertical);

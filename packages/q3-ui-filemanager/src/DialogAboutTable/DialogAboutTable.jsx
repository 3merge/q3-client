import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import { string } from 'q3-ui-helpers';
import { useTranslation } from 'q3-ui-locale';
import { getFileType, toMbs } from '../utils';
import useStyle from './styles';

const DialogAboutTable = ({ size, updatedAt, url }) => {
  const { t } = useTranslation('labels');
  const cls = useStyle();

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell className={cls.cell} component="th">
            {t('property')}
          </TableCell>
          <TableCell className={cls.cell} component="th">
            {t('description')}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell className={cls.cell}>
            {t('size')}
          </TableCell>
          <TableCell
            className={cls.cell}
            data-testid="size"
          >
            {toMbs(size)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={cls.cell}>
            {t('type')}
          </TableCell>
          <TableCell
            className={cls.cell}
            data-testid="type"
          >
            {url ? getFileType(url) : 'N/A'}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className={cls.cell}>
            {t('updatedAt')}
          </TableCell>
          <TableCell
            className={cls.cell}
            data-testid="updatedAt"
          >
            {string.toDate(updatedAt)}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

DialogAboutTable.defaultProps = {
  size: 0,
  updatedAt: new Date().toISOString(),
  url: null,
};

DialogAboutTable.propTypes = {
  size: PropTypes.number,
  updatedAt: PropTypes.string,
  url: PropTypes.string,
};

export default DialogAboutTable;

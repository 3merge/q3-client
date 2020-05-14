import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Apps from '@material-ui/icons/AssignmentReturned';
import { DropDownMenu } from 'q3-ui/lib/toolbar';
import { SelectOne } from 'q3-ui-exports';
import TableCellHeader from './cellHeader';
import {
  hasKeys,
  invoke,
  hasLength,
} from '../utils/helpers';
import useStyles from '../utils/useStyles';

export const intersectWithKeys = (a = {}, b = []) => {
  const copy = {};
  const keys = Object.keys(copy);

  b.forEach((item) => {
    Object.assign(copy, {
      [item]:
        !keys.includes(item) && item !== 'name'
          ? undefined
          : get(a, item),
    });
  });

  return copy;
};

/**
 * @NOTE
 * If the key does not exist in active columns,
 * it skips rendering it.
 */
export const renderTableCells = (
  items = {},
  columns = [],
  translateUtil,
) => {
  const entries = Object.entries(
    intersectWithKeys(items, columns),
  );
  return hasKeys(items) && Array.isArray(columns)
    ? entries.map(([key, value], i) => (
        <TableCell
          key={key}
          data-title={translateUtil(key)}
          colSpan={entries.length - 1 === i ? 2 : undefined}
        >
          {value || get(items, key, '--')}
        </TableCell>
      ))
    : [];
};

const Row = ({
  id,
  columns,
  activeColumns,
  rowToolbar,
  onClick,
}) => {
  const { mobileCheckbox, row } = useStyles();
  const { t } = useTranslation('labels');
  const { name, description, photo, disableLink } = columns;

  return (
    <TableRow className={row}>
      <TableCell
        className={mobileCheckbox}
        colSpan={!columns ? 2 : undefined}
      >
        <SelectOne id={id} />
        {hasLength(rowToolbar) ? (
          <DropDownMenu items={invoke(rowToolbar)}>
            {(open, isOpen) => (
              <Tooltip title={t('menu')}>
                <IconButton
                  style={{ opacity: isOpen ? 1 : null }}
                  onClick={open}
                >
                  <Apps />
                </IconButton>
              </Tooltip>
            )}
          </DropDownMenu>
        ) : null}
      </TableCell>
      <TableCellHeader
        onClick={onClick}
        name={t(name)}
        sub={t(description)}
        to={disableLink ? null : `${id}`}
        imgSrc={
          typeof photo === 'string' ? t(photo) : photo
        }
      />
      {renderTableCells(columns, activeColumns, t)}
    </TableRow>
  );
};

Row.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onClick: PropTypes.func,

  rowToolbar: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func,
      label: PropTypes.string,
    }),
  ),
  columns: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    photo: PropTypes.string,
    disableLink: PropTypes.bool,
  }).isRequired,

  activeColumns: PropTypes.arrayOf(PropTypes.string)
    .isRequired,
};

Row.defaultProps = {
  rowToolbar: [],
  onClick: null,
};

export default Row;

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Apps from '@material-ui/icons/AssignmentReturned';
import { DropDownMenu } from 'q3-ui/lib/toolbar';
import TableCellHeader from './cellHeader';
import { SelectOne } from './select';
import {
  hasKeys,
  invoke,
  hasLength,
} from '../utils/helpers';
import useStyles from '../utils/useStyles';

export const intersectWithKeys = (a = {}, b = []) => {
  const keys = Object.keys(a);
  keys.forEach((item) => {
    // eslint-disable-next-line
    if (!b.includes(item)) delete a[item];
  });

  b.forEach((item) => {
    // name must be excluded as it renders the <CellHeader /> automatically
    if (!keys.includes(item) && item !== 'name')
      Object.assign(a, { [item]: undefined });
  });

  return a;
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
) =>
  hasKeys(items) && Array.isArray(columns)
    ? Object.entries(intersectWithKeys(items, columns)).map(
        ([key, value]) => (
          <TableCell
            key={key}
            data-title={translateUtil(key)}
          >
            {value || '--'}
          </TableCell>
        ),
      )
    : [];

const Row = ({
  id,
  disableLink,
  columns: { name, description, photo, ...etc },
  activeColumns,
  rowToolbar,
}) => {
  const { mobileCheckbox, row } = useStyles();
  const { t } = useTranslation('labels');

  return (
    <TableRow className={row}>
      <TableCell className={mobileCheckbox}>
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
        name={t(name)}
        sub={t(description)}
        to={disableLink ? null : `${id}`}
        imgSrc={
          typeof photo === 'string' ? t(photo) : photo
        }
      />
      {renderTableCells(etc, activeColumns, t)}
    </TableRow>
  );
};

Row.propTypes = {
  id: PropTypes.string.isRequired,
  disableLink: PropTypes.bool,
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
  }).isRequired,

  activeColumns: PropTypes.arrayOf(PropTypes.string)
    .isRequired,
};

Row.defaultProps = {
  rowToolbar: [],
  disableLink: false,
};

export default Row;

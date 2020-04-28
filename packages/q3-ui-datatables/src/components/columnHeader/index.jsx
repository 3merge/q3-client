import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { withLocation } from 'with-location';
import { useTranslation } from 'react-i18next';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableCell from '@material-ui/core/TableCell';
import { browser } from 'q3-ui-helpers';

const { proxyLocalStorageApi } = browser;

export const includesNegativeCharacter = (v) =>
  typeof v === 'string' && v.includes('-');

export const ColumnHeader = ({
  id,
  title,
  getFrom,
  params,
  cols,
  setCols,
  dragOver,
  setDragOver,
  disableDnD,
}) => {
  const sort = getFrom('sort');
  const { t } = useTranslation();
  const isAsc = includesNegativeCharacter(sort);

  params.set('sort', !sort || isAsc ? title : `-${title}`);

  React.useEffect(() => {
    proxyLocalStorageApi('setItem', id, sort);
  }, [sort]);

  const handleDragStart = (e) => {
    const { id: tid } = e.target;
    const idx = cols.indexOf(tid);
    e.dataTransfer.setData('colIdx', idx);
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleDragEnter = (e) => {
    const { id: tid } = e.target;
    setDragOver(tid);
  };

  const handleOnDrop = (e) => {
    const { id: tid } = e.target;

    const droppedColIdx = cols.indexOf(tid);
    const draggedColIdx = e.dataTransfer.getData('colIdx');
    const tempCols = [...cols];

    tempCols[draggedColIdx] = cols[droppedColIdx];
    tempCols[droppedColIdx] = cols[draggedColIdx];

    setCols(tempCols);
    setDragOver('');
  };

  return (
    <TableCell
      component="th"
      className="q3-dnd-table-header"
      dragOver={title === dragOver}
      onDrop={handleOnDrop}
      style={{
        whiteSpace: 'nowrap',
      }}
    >
      <TableSortLabel
        active={sort && sort.includes(title)}
        direction={isAsc ? 'asc' : 'desc'}
        component={Link}
        to={`?${params.toString()}`}
        draggable={!disableDnD}
        id={title}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        style={{
          border:
            title === dragOver ? '1px dashed #DDD' : 'none',
        }}
      >
        {t(`labels:${title}`)}
      </TableSortLabel>
    </TableCell>
  );
};

ColumnHeader.propTypes = {
  /**
   * The local storage identifier for this table.
   */
  id: PropTypes.string.isRequired,

  /**
   * The rendered text
   */
  title: PropTypes.string.isRequired,

  /**
   * Inherited from "withLocation" HOC.
   */
  getFrom: PropTypes.func.isRequired,

  /**
   * Inherited from "withLocation" HOC.
   */
  params: PropTypes.shape({
    toString: PropTypes.func,
    set: PropTypes.func,
  }).isRequired,

  /**
   * Remove  DnD support
   */
  disableDnD: PropTypes.bool,

  cols: PropTypes.arrayOf(PropTypes.string).isRequired,
  setCols: PropTypes.func.isRequired,
  dragOver: PropTypes.string.isRequired,
  setDragOver: PropTypes.func.isRequired,
};

ColumnHeader.defaultProps = {
  disableDnD: false,
};

export default withLocation(ColumnHeader);

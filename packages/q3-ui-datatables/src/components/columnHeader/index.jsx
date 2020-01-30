import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import { withLocation } from 'with-location';
import { useTranslation } from 'react-i18next';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableCell from '@material-ui/core/TableCell';

export const includesNegativeCharacter = (v) =>
  typeof v === 'string' && v.includes('-');

export const ColumnHeader = ({
  title,
  storageKey,
  getFrom,
  pushTo,
  params,
}) => {
  const sort = getFrom('sort');
  const { t } = useTranslation();
  const isAsc = includesNegativeCharacter(sort);

  const prefixStorageKey = () =>
    !sort || isAsc ? storageKey : `-${storageKey}`;

  const onClick = () => {
    pushTo({ sort: prefixStorageKey() });
    navigate(`?${params.toString()}`);
  };

  return (
    <TableCell component="th">
      <TableSortLabel
        active={sort && sort.includes(storageKey)}
        direction={isAsc ? 'asc' : 'desc'}
        onClick={onClick}
      >
        {t(`labels:${title}`)}
      </TableSortLabel>
    </TableCell>
  );
};

ColumnHeader.propTypes = {
  /**
   * The rendered text
   */
  title: PropTypes.string.isRequired,

  /**
   * The sorting prop to store locally.
   */
  storageKey: PropTypes.string.isRequired,

  /**
   * Inherited from "withLocation" HOC.
   */
  getFrom: PropTypes.func.isRequired,

  /**
   * Inherited from "withLocation" HOC.
   */
  pushTo: PropTypes.func.isRequired,

  /**
   * Inherited from "withLocation" HOC.
   */
  params: PropTypes.shape({
    toString: PropTypes.func,
  }).isRequired,
};

export default withLocation(ColumnHeader);

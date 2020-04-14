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
}) => {
  const sort = getFrom('sort');
  const { t } = useTranslation();
  const isAsc = includesNegativeCharacter(sort);

  params.set('sort', !sort || isAsc ? title : `-${title}`);

  React.useEffect(() => {
    proxyLocalStorageApi('setItem', id, sort);
  }, [sort]);

  return (
    <TableCell component="th">
      <TableSortLabel
        active={sort && sort.includes(title)}
        direction={isAsc ? 'asc' : 'desc'}
        component={Link}
        to={`?${params.toString()}`}
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
};

export default withLocation(ColumnHeader);

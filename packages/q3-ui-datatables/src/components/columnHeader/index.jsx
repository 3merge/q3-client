import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import { withLocation } from 'with-location';
import { useTranslation } from 'react-i18next';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableCell from '@material-ui/core/TableCell';
import { browser } from 'q3-ui-helpers';

const {
  proxyLocalStorageApi,
  isDefined,
  isBrowserReady,
} = browser;

export const makeStorageSessionName = (id, key) =>
  `${id}:${key}`;

export const includesNegativeCharacter = (v) =>
  typeof v === 'string' && v.includes('-');

export const ColumnHeader = ({
  id,
  title,
  getFrom,
  defaultSortPreference,
  pushTo,
  params,
}) => {
  const sort = getFrom('sort');
  const { t } = useTranslation();
  const isAsc = includesNegativeCharacter(sort);

  const prefixStorageKey = () =>
    !sort || isAsc ? title : `-${title}`;

  const addToQueryIfDefined = (newSortValue) => {
    if (!isDefined(newSortValue)) return;
    proxyLocalStorageApi('setItem', id, newSortValue);

    pushTo({ sort: newSortValue });
    navigate(`?${params.toString()}`);
  };

  const onClick = () => {
    addToQueryIfDefined(prefixStorageKey());
  };

  React.useEffect(() => {
    if (!isBrowserReady() || sort) return;

    addToQueryIfDefined(
      proxyLocalStorageApi('getItem', id) ||
        defaultSortPreference,
    );
  }, []);

  return (
    <TableCell component="th">
      <TableSortLabel
        active={sort && sort.includes(title)}
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
   * The local storage identifier for this table.
   */
  id: PropTypes.string.isRequired,

  /**
   * The rendered text
   */
  title: PropTypes.string.isRequired,

  /**
   * The default sorting prop.
   */
  defaultSortPreference: PropTypes.string,

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

ColumnHeader.defaultProps = {
  defaultSortPreference: '-updatedAt',
};

export default withLocation(ColumnHeader);

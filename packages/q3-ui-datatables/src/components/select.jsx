import React from 'react';
import Badge from '@material-ui/core/Badge';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Checkbox from '@material-ui/core/Checkbox';
import TableContext from '../utils/context';

export const SelectAll = ({ ids }) => {
  const { t } = useTranslation();
  const ctx = React.useContext(TableContext);

  if (!ctx) return null;
  const { checked, onCheckAll, hasChecked } = ctx;
  const label = checked.length
    ? t('labels:clearAll')
    : t('labels:selectAll');

  return (
    <Badge badgeContent={checked.length} color="primary">
      <Checkbox
        style={{ padding: 12 }}
        aria-label={label}
        onClick={onCheckAll(ids)}
        checked={hasChecked()}
      />
    </Badge>
  );
};

SelectAll.propTypes = {
  ids: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  ).isRequired,
};

export const SelectOne = ({ id }) => {
  const { t } = useTranslation();
  const ctx = React.useContext(TableContext);
  if (!ctx) return null;

  const { isChecked, onCheck } = ctx;

  return (
    <Checkbox
      aria-label={t('labels:check')}
      onClick={onCheck(id)}
      checked={isChecked(id)}
      style={{ padding: 12 }}
    />
  );
};

SelectOne.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

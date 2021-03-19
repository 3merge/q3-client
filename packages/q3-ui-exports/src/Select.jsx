import React from 'react';
import Badge from '@material-ui/core/Badge';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Checkbox from '@material-ui/core/Checkbox';
import { size, intersection } from 'lodash';
import { State } from './Context';

export const SelectAll = ({ ids }) => {
  const { t } = useTranslation();
  const ctx = React.useContext(State);

  if (!ctx) return null;

  const { onCheckSome, hasChecked } = ctx;

  const checked = intersection(ctx.checked, ids);
  const len = size(checked);
  const label = len
    ? t('labels:clearAll')
    : t('labels:selectAll');

  return (
    <Badge
      badgeContent={len}
      color="secondary"
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <Checkbox
        style={{ padding: 0 }}
        aria-label={label}
        onClick={onCheckSome(ids)}
        checked={hasChecked() && len}
        indeterminate={
          checked.length > 0 &&
          checked.length !== ids.length
        }
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
  const ctx = React.useContext(State);
  if (!ctx) return null;

  const { isChecked, onCheck } = ctx;

  return (
    <Checkbox
      aria-label={t('labels:check')}
      onClick={onCheck(id)}
      checked={isChecked(id)}
      style={{ padding: 0 }}
    />
  );
};

SelectOne.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

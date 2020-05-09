import React from 'react';
import Badge from '@material-ui/core/Badge';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import { State } from './Context';

export const SelectAll = ({ ids }) => {
  const { t } = useTranslation();
  const ctx = React.useContext(State);

  if (!ctx) return null;
  const { checked, onCheckAll, hasChecked } = ctx;
  const label = checked.length
    ? t('labels:clearAll')
    : t('labels:selectAll');

  return (
    <Box p="12px">
      <Badge
        badgeContent={checked.length}
        color="secondary"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Checkbox
          style={{ padding: 0 }}
          aria-label={label}
          onClick={onCheckAll(ids)}
          checked={hasChecked()}
        />
      </Badge>
    </Box>
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

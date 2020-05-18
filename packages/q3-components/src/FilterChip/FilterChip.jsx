/* eslint-disable no-param-reassign */
import React from 'react';
import Chip from '@material-ui/core/Chip';
import { withLocation } from 'with-location';
import { useTranslation } from 'react-i18next';

export const unwind = (str = '', value) =>
  str
    .split(',')
    .filter((v) => v !== value)
    .join(',');

export const getOp = (str) => {
  if (str.includes('!=') && str.includes(','))
    return 'NOT IN';
  if (str.includes('!=')) return 'IS NOT';
  if (str.includes('=') && str.includes(',')) return 'IN';
  if (str.includes('=')) return 'IS';
  return 'HAS';
};

const FilterChip = ({ getAll, params, navigate }) => {
  const { t } = useTranslation('filters');

  const chips = Object.entries(getAll())
    .filter(
      ([key]) =>
        !['sort', 'page', 'search', 'limit'].includes(key),
    )
    .map(([key, value]) =>
      decodeURIComponent(value ? `${key}=${value}` : key),
    );

  const removeFromSearchString = (name) => () => {
    params.delete(name);
    navigate(`?${params.toString()}`);
  };

  const modifyInSearchString = (
    name,
    valueToOmit,
    values,
  ) => () => {
    params.set(name, unwind(values, valueToOmit));
    navigate(`?${params.toString()}`);
  };

  return chips.map((chip) => {
    const [name, value] = chip.split('=');
    return value && value.includes(',') ? (
      value
        .split(',')
        .map((label) => (
          <Chip
            style={{ marginRight: '0.25rem' }}
            key={`${chip}-${label}`}
            label={`${getOp(chip)} ${t(
              label.toLowerCase(),
            )}`}
            onDelete={modifyInSearchString(
              name,
              label,
              value,
            )}
          />
        ))
    ) : (
      <Chip
        key={chip}
        style={{ marginRight: '0.25rem' }}
        onDelete={removeFromSearchString(name, value)}
        label={`${getOp(chip)} ${t(
          (value && value !== 'true' && value !== 'false'
            ? value
            : name
          )
            .replace('!', '')
            .toLowerCase(),
        )}`}
      />
    );
  });
};

FilterChip.propTypes = {};

FilterChip.defaultProps = {};

export default withLocation(FilterChip);

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

export const getOp = (op, name, value) => {
  if (op.includes('exists(true)')) return `${name}`;
  if (op.includes('exists(false)')) return `NOT ${name}`;
  if (op.includes('has(true)')) return `HAS ${name}`;
  if (op.includes('has(false)')) return `HAS NOT ${name}`;

  if (op.includes('!=') && op.includes(','))
    return `${value} NOT IN ${name}`;

  if (op.includes('!=') && op.includes(','))
    return `${value} NOT IN ${name}`;

  if (op.includes('>='))
    return `${name} IS MORE THAN ${value}`;
  if (op.includes('<'))
    return `${name} IS LESS THAN ${value}`;

  if (op.includes('=') && op.includes(','))
    return `${value} IN ${name}`;

  if (op.includes('!=')) return `${name} IS NOT ${value}`;
  if (op.includes('=') && op.includes(','))
    return `IN ${value}`;
  if (op.includes('=')) return `${name} IS ${value}`;

  return '';
};

const FilterChip = ({ getAll, params, navigate }) => {
  const { t } = useTranslation();

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

  const getChipLabel = (chip, name, value) =>
    getOp(chip, t(`labels:${name}`), t(`filters:${value}`));

  const sharedProps = {
    variant: 'outlined',
    style: {
      marginRight: '0.25rem',
      marginBottom: '0.25rem',
    },
  };

  return chips.map((chip) => {
    const [name, value] = chip.split('=');
    return value && value.includes(',') ? (
      value
        .split(',')
        .map((label) => (
          <Chip
            {...sharedProps}
            key={`${chip}-${label}`}
            label={getChipLabel(chip, name, label)}
            onDelete={modifyInSearchString(
              name,
              label,
              value,
            )}
          />
        ))
    ) : (
      <Chip
        {...sharedProps}
        key={chip}
        onDelete={removeFromSearchString(name, value)}
        label={getChipLabel(chip, name, value)}
      />
    );
  });
};

FilterChip.propTypes = {};

FilterChip.defaultProps = {};

export default withLocation(FilterChip);

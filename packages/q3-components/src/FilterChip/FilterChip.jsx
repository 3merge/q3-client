/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import { withLocation } from 'with-location';
import { useTranslation } from 'react-i18next';

import {
  unwind,
  getOp,
  filterKeysByReservedSearchKeys,
  decodeEntry,
  redirectByParams,
  formatter,
} from './utils';

const DecoratedChip = ({ onDelete, label }) =>
  label ? (
    <Chip
      size="small"
      label={label}
      onDelete={onDelete}
      variant="outlined"
      style={{
        marginRight: '0.25rem',
        marginBottom: '0.25rem',
      }}
    />
  ) : null;

DecoratedChip.propTypes = {
  onDelete: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default withLocation(
  ({ getAll, params, navigate }) => {
    const { t } = useTranslation();
    const redirect = redirectByParams(params, navigate);

    const chips = filterKeysByReservedSearchKeys(
      Object.entries(getAll()),
    ).map(decodeEntry);

    const removeFromSearchString = (name) => () => {
      params.delete(name);
      redirect();
    };

    const modifyInSearchString = (
      name,
      valueToOmit,
      values,
    ) => () => {
      params.set(name, unwind(values, valueToOmit));
      redirect();
    };

    const getChipLabel = (chip, name, value) =>
      getOp(
        chip,
        t(`labels:${formatter(name).key}`),
        t(`filters:${formatter(value).value}`),
      );

    if (!chips.length) return null;

    return (
      <Box
        id="q3-filter-chips"
        display="inline-block"
        px={2}
      >
        {chips.map((chip) => {
          // allow it to split only once
          const [name, value] = chip.split(/=(.+)/);
          return value && value.includes(',') ? (
            value
              .split(',')
              .map((label) => (
                <DecoratedChip
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
            <DecoratedChip
              key={chip}
              onDelete={removeFromSearchString(name, value)}
              label={getChipLabel(chip, name, value)}
            />
          );
        })}
      </Box>
    );
  },
);

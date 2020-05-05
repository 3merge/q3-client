import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import useOptions from '../helpers/useOptions';
import {
  simulateEventHandler,
  getLabelWithFallback,
} from './helpers';
import withGrid, { fieldProps } from './withGrid';

const Chips = (props) => {
  const { t } = useTranslation('labels');
  const {
    label,
    helperText,
    onChange,
    error,
    name,
    value,
  } = props;

  const { loading, items = [] } = useOptions({
    minimumCharacterCount: 0,
    ...props,
  });

  const getTags = (values = []) =>
    values
      .map((v) => {
        const match = items.find((item) => {
          const compare =
            typeof v !== 'object' ? v : v.value;

          return typeof item === 'string'
            ? item === compare
            : item.value === compare;
        });

        return get(match, 'label', match);
      })
      .filter(Boolean);

  return (
    value !== undefined && (
      <Autocomplete
        {...props}
        multiple
        fullWidth
        loading={loading}
        filterSelectedOptions
        defaultValue={value || []}
        options={items}
        getOptionLabel={getLabelWithFallback(value)}
        onChange={simulateEventHandler(onChange, name)}
        renderTags={(values, getTagProps) =>
          getTags(values).map((option, index) => (
            <Chip
              color="primary"
              label={t(option)}
              disabled={index === 0}
              size="small"
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            helperText={helperText}
            error={error}
            variant="outlined"
            fullWidth
          />
        )}
      />
    )
  );
};

Chips.propTypes = {
  ...fieldProps,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
};

Chips.defaultProps = {
  options: [],
};

export default withGrid(Chips);

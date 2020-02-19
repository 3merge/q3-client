import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { useTranslation } from 'react-i18next';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import { useField } from 'formik';
import useOptions from '../helpers/useOptions';
import useDecorator from '../helpers/useDecorator';
import { getDropdownLabel } from './autocomplete';

export const intercept = (fn, name) => (e, newValue) => {
  const value = newValue.map((v) => get(v, 'value', v));
  return fn({
    target: {
      value,
      name,
    },
  });
};

const Chips = (props) => {
  const { t } = useTranslation('labels');
  const { label, helperText, onChange } = useDecorator(
    props,
  );
  const [{ name, value, ...field }, { error }] = useField(
    props,
  );

  const { loading, items = [] } = useOptions(props);

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
        {...field}
        multiple
        loading={loading}
        filterSelectedOptions
        defaultValue={value || []}
        options={items}
        getOptionLabel={getDropdownLabel(value)}
        onChange={intercept(onChange, name)}
        renderTags={(values, getTagProps) =>
          getTags(values).map((option, index) => (
            <Chip
              color="primary"
              variant="outlined"
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
            variant="filled"
            fullWidth
          />
        )}
      />
    )
  );
};

Chips.propTypes = {
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

export default Chips;

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import { useField } from 'formik';
import useOptions from '../helpers/useOptions';
import { intercept } from './date';
import useDecorator from '../helpers/useDecorator';

const Chips = (props) => {
  const { t } = useTranslation('labels');
  const { label, helperText } = useDecorator(props);
  const [{ name, value, ...field }, { error }] = useField(
    props,
  );

  const { items = [] } = useOptions(props);

  return (
    value !== undefined && (
      <Autocomplete
        {...props}
        {...field}
        multiple
        filterSelectedOptions
        defaultValue={value || []}
        options={items}
        onChange={intercept(field.onChange, name)}
        renderTags={(values, getTagProps) =>
          values.map((option, index) => (
            <Chip
              label={t(option)}
              disabled={index === 0}
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
            InputProps={{
              disableUnderline: true,
              ...params.InputProps,
            }}
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

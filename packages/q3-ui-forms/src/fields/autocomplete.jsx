import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { useField } from 'formik';
import useOptions from '../helpers/useOptions';
import { intercept } from './date';
import useDecorator from '../helpers/useDecorator';
import { isObject } from '../helpers';

export const AutoCompleteWrapper = (props) => {
  const { t } = useTranslation('labels');
  const { label, helperText, disableFilter } = useDecorator(
    props,
  );
  const [{ name, value, ...field }, { error }] = useField(
    props,
  );

  const { loading, onChange, items = [] } = useOptions(
    props,
  );

  const getDropdownLabel = (option) => {
    if (typeof option === 'object') return option.label;

    if (isObject(value) && value.value === option)
      return value.label;

    return option;
  };

  const getCustomInput = (params) =>
    React.createElement(TextField, {
      ...params,
      label,
      helperText,
      onChange,
      error: Boolean(error),
      variant: 'filled',
      fullWidth: true,
      InputProps: {
        disableUnderline: true,
        ...params.InputProps,
      },
      inputProps: {
        autoComplete: new Date().toISOString(),
        ...params.inputProps,
      },
    });

  return (
    <Autocomplete
      {...props}
      {...field}
      label={t(name)}
      options={items}
      loading={loading}
      defaultValue={isObject(value) ? value.value : value}
      renderInput={getCustomInput}
      getOptionLabel={getDropdownLabel}
      onChange={intercept(field.onChange, name)}
      filterOptions={
        disableFilter
          ? (options) => {
              return options;
            }
          : undefined
      }
    />
  );
};

AutoCompleteWrapper.propTypes = {
  loadOptions: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
};

AutoCompleteWrapper.defaultProps = {
  options: [],
};

export default AutoCompleteWrapper;

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import useOptions from '../helpers/useOptions';
import { intercept } from './date';
import useDecorator from '../helpers/useDecorator';
import { isObject } from '../helpers';

export const getDropdownLabel = (value) => (option) => {
  if (typeof option === 'object') return option.label;

  if (isObject(value) && value.value === option)
    return value.label;

  return option;
};

export const AutoCompleteWrapper = (props) => {
  const { t } = useTranslation('labels');
  const {
    label,
    helperText,
    disableFilter,
    onChange: handleChange,
    error,
    field,
    name,
    value,
  } = useDecorator(props);

  const { loading, onChange, items = [] } = useOptions(
    props,
  );

  const getCustomInput = (params) =>
    React.createElement(TextField, {
      ...params,
      label,
      helperText,
      onChange,
      error: Boolean(error),
      variant: 'filled',
      fullWidth: true,
      inputProps: {
        autoComplete: new Date().toISOString(),
        ...params.inputProps,
      },
    });
  const getValue = () =>
    isObject(value) ? value.value : value;

  return (
    <Autocomplete
      {...props}
      {...field}
      label={t(name)}
      options={items}
      loading={loading}
      defaultValue={getValue()}
      value={getValue()}
      renderInput={getCustomInput}
      getOptionLabel={getDropdownLabel(value)}
      onChange={intercept(handleChange, name)}
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

import React from 'react';
import PropTypes from 'prop-types';
import { pick, merge } from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { object } from 'q3-ui-helpers';
import { useOptions } from '../../hooks';
import { getLabelWithFallback } from '../helpers';
import withGrid from '../withGrid';
import withState from '../withState';
import { chosenTextFieldDisplayAttributes } from '../TextBase/TextBase';

export const controlSearchFilter = ({
  filter = false,
  preload = false,
  loadOptions,
}) => {
  return !filter || (loadOptions && !preload)
    ? {
        filterSelectedOptions: false,
        // disableFilter: true,
      }
    : {};
};

export const pickFromProps = (props) => ({
  ...pick(props, [
    'disabled',
    'label',
    'name',
    'onChange',
    'getOptionDisabled',
    'renderOption',
    'readOnly',
    'required',
    'freeSolo',
  ]),
  ListboxProps: {
    style: {
      maxHeight: 250,
    },
  },
});

export const getCustomInput = (customProps) => (params) =>
  React.createElement(
    TextField,
    merge(params, customProps, {
      variant: 'outlined',
      fullWidth: true,
      autoComplete: 'Noop',
      inputProps: {
        autoComplete: 'NOOP',
      },
    }),
  );

export const compareOptionValueToState = (option, value) =>
  option === value ||
  option.value === value ||
  (value === '' && !option);

export const getValue = (value) =>
  object.hasKeys(value) ? value.value : value;

export const filterOptions = ({ disableFilter }) =>
  disableFilter ? (options) => options : undefined;

const AutoCompleteWrapper = (props) => {
  const {
    label,
    helperText,
    error,
    value,
    required,
    freeSolo,
  } = props;

  const {
    loading,
    onChange,
    items = [],
    value: inputValue,
  } = useOptions({
    minimumCharacterCount: 1,
    ...props,
  });

  return (
    <Autocomplete
      {...chosenTextFieldDisplayAttributes}
      {...controlSearchFilter(props)}
      {...pickFromProps(props)}
      value={value}
      required={required}
      options={items}
      loading={loading}
      getOptionLabel={getLabelWithFallback(value)}
      getOptionSelected={compareOptionValueToState}
      filterOptions={filterOptions(props)}
      renderInput={getCustomInput({
        error: Boolean(error),
        value: inputValue,
        required,
        label,
        onChange,
        helperText,
        ...(freeSolo
          ? {
              onBlur: () => {
                // force update of main value if free-form text
                if (freeSolo) props.onChange(inputValue);
              },
            }
          : {}),
      })}
    />
  );
};

AutoCompleteWrapper.propTypes = {
  label: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  loadOptions: PropTypes.func,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
      }),
      PropTypes.string,
    ]),
  ),
  freeSolo: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

AutoCompleteWrapper.defaultProps = {
  options: [],
  loadOptions: null,
  helperText: '',
  error: false,
  required: false,
  value: '',
  freeSolo: false,
};

export default withGrid(withState(AutoCompleteWrapper));

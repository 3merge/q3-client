import React from 'react';
import PropTypes from 'prop-types';
import { isString, isObject, pick, merge } from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { object } from 'q3-ui-helpers';
import { useOptions } from '../../hooks';
import {
  getLabelWithFallback,
  valueToLabel,
} from '../helpers';
import withGrid from '../withGrid';
import withState from '../withState';
import { chosenTextFieldDisplayAttributes } from '../TextBase/TextBase';

const shouldDisableFilter = ({
  preload = false,
  loadOptions,
}) => loadOptions && !preload;

export const controlSearchFilter = (args = {}) =>
  shouldDisableFilter(args)
    ? {
        filterSelectedOptions: true,
        // disableFilter: true,
      }
    : {
        filterSelectedOptions: true,
        // disableFilter: false,
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
      autoComplete: 'off',
      inputProps: {
        autoComplete: 'off',
      },
    }),
  );

const compareToState = (optionProp) => (option, value) =>
  option === value ||
  option[optionProp] === value ||
  (value === '' && !option);

export const compareOptionValueToState = compareToState(
  'value',
);

export const compareOptionLabelToState = compareToState(
  'label',
);

export const getValue = (value) =>
  object.hasKeys(value) ? value.value : value;

export const filterOptions = (props = {}) =>
  shouldDisableFilter(props)
    ? (options) => options
    : undefined;

export const buildAutoComplete = (v, items) => {
  let out = {};

  if (isObject(v)) out = v;
  else if (isString(v))
    out = {
      value: v,
    };

  if (!out.label)
    Object.assign(out, {
      label: out.value,
    });

  out.label = valueToLabel(items)(out.label);
  return out;
};

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

  React.useEffect(() => {
    if (freeSolo && inputValue) props.onChange(inputValue);
  }, [inputValue]);

  React.useEffect(() => {
    if (freeSolo && isString(value) && value !== inputValue)
      onChange({
        target: {
          value,
        },
      });
  }, [value]);

  return (
    <Autocomplete
      {...chosenTextFieldDisplayAttributes}
      {...controlSearchFilter(props)}
      {...pickFromProps(props)}
      // eslint-disable-next-line
      id={props.id}
      value={value ? buildAutoComplete(value, items) : ''}
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

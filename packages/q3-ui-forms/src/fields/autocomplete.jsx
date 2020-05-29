import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import useOptions from '../helpers/useOptions';
import {
  getLabelWithFallback,
  simulateEventHandler,
} from './helpers';
import { isObject } from '../helpers';
import withGrid from './withGrid';
import useDecorator from '../helpers/useDecorator';
import { chosenTextFieldDisplayAttributes } from './TextBase/TextBase';

export const getCustomInput = (customProps) => (params) =>
  React.createElement(TextField, {
    ...params,
    ...customProps,
    variant: 'outlined',
    fullWidth: true,
    inputProps: {
      autoComplete: new Date().toISOString(),
      ...params.inputProps,
    },
  });

export const getValue = (value) =>
  isObject(value) ? value.value : value;

export const filterOptions = ({ disableFilter }) =>
  disableFilter
    ? (options) => {
        return options;
      }
    : undefined;

export const AutoCompleteWrapper = (props) => {
  const { t } = useTranslation('labels');
  const {
    label,
    helperText,
    onChange: handleChange,
    error,
    field,
    name,
    value,
  } = useDecorator(props);

  const { loading, onChange, items = [] } = useOptions({
    minimumCharacterCount: 1,
    ...props,
  });

  return (
    <Autocomplete
      {...props}
      {...field}
      {...chosenTextFieldDisplayAttributes}
      label={t(name)}
      options={items}
      loading={loading}
      defaultValue={getValue(value)}
      value={getValue(value)}
      getOptionLabel={getLabelWithFallback(value)}
      onChange={simulateEventHandler(handleChange, name)}
      filterOptions={filterOptions(props)}
      renderInput={getCustomInput({
        error: Boolean(error),
        label,
        helperText,
        onChange,
      })}
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

export default withGrid(AutoCompleteWrapper);

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { useField } from 'formik';
import useOptions from '../helpers/useOptions';
import { intercept } from './date';
import useDecorator from '../helpers/useDecorator';

export const AutoCompleteWrapper = (props) => {
  const { t } = useTranslation('labels');
  const { label, helperText } = useDecorator(props);
  const [{ name, value, ...field }, { error }] = useField(
    props,
  );

  const { loading, onChange, items = [] } = useOptions(
    props,
  );

  const getDropdownLabel = (option) =>
    t(typeof option === 'object' ? option.label : option);

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
      {...field}
      label={t(name)}
      options={items}
      loading={loading}
      defaultValue={field.value}
      renderInput={getCustomInput}
      getOptionLabel={getDropdownLabel}
      onChange={intercept(field.onChange, name)}
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

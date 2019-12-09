import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { get } from 'lodash';
import TextField from '@material-ui/core/TextField';
import { connect } from 'formik';
import { styleProps } from '../inputs';
import useFormik from '../inputs/useFormik';

export const AutoCompleteWrapper = ({
  loadOptions,
  inputProps,
  formik,
  ...etc
}) => {
  const integrated = useFormik({
    ...etc,
    ...inputProps,
    formik,
  });
  const {
    readOnly,
    disabled,
    value,
    ...decoratedInputProps
  } = integrated;

  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState(
    get(value, 'value'),
  );

  const onInputChange = React.useCallback(({ target }) => {
    setSearchTerm(target.value);
    setLoading(true);
  }, []);

  const onChange = React.useCallback(
    (e, val) =>
      formik.setFieldValue(decoratedInputProps.name, val),
    [formik],
  );

  const onSearch = React.useCallback(() => {
    if (!loading) return;
    loadOptions(searchTerm)
      .catch(() => [])
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, [searchTerm, loading]);

  React.useEffect(() => {
    onSearch();
  }, [loading]);

  return (
    <Autocomplete
      {...etc}
      onChange={onChange}
      options={items}
      loading={loading}
      disabled={disabled}
      readOnly={readOnly}
      getOptionLabel={(option) => option.label}
      defaultValue={value}
      renderInput={(params) => (
        <TextField
          {...params}
          {...decoratedInputProps}
          {...styleProps}
          aria-busy={loading}
          onChange={onInputChange}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'off',
          }}
        />
      )}
    />
  );
};

AutoCompleteWrapper.propTypes = {
  loadOptions: PropTypes.func.isRequired,
  formik: PropTypes.shape({
    setFieldValue: PropTypes.func,
    values: PropTypes.object,
    errors: PropTypes.object,
    isSubmitting: PropTypes.bool,
  }).isRequired,
  inputProps: PropTypes.shape({
    label: PropTypes.string,
    name: PropTypes.string,
    readOnly: PropTypes.bool,
  }).isRequired,
};

export default connect(AutoCompleteWrapper);

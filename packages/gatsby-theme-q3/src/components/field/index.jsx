import React from 'react';
import PropTypes from 'prop-types';
import { connect, getIn } from 'formik';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

const Field = ({ formik, name, label, type, icon: Icon, ...rest }) => {
  const value = getIn(formik, `values.${name}`);
  const err = getIn(formik, `errors.${name}`);

  const handleOnChange = ({ target }) => {
    formik.setFieldValue(name, target.value);
  };

  return (
    <TextField
      {...rest}
      name={name}
      label={label}
      type={type}
      error={Boolean(err)}
      helperText={err}
      value={value}
      onChange={handleOnChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Icon />
          </InputAdornment>
        ),
      }}
      margin="normal"
      variant="outlined"
      fullWidth
    />
  );
};

Field.propTypes = {
  formik: PropTypes.shape({
    values: PropTypes.object,
    errors: PropTypes.object,
    setFieldValue: PropTypes.func,
  }).isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  icon: PropTypes.node,
};

Field.defaultProps = {
  icon: () => null,
  type: 'text',
};

export default connect(Field);

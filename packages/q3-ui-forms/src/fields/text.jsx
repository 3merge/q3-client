import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import TextField from '@material-ui/core/TextField';
import Lock from '@material-ui/icons/Lock';
import useDecorator from '../helpers/useDecorator';

const Text = (props) => {
  const { type } = props;
  const [field] = useField(props);
  const {
    disabled,
    readOnly,
    label,
    helperText,
    error,
  } = useDecorator(props);

  return (
    <TextField
      {...field}
      disabled={disabled}
      readOnly={readOnly}
      label={label}
      helperText={helperText}
      error={error}
      fullWidth
      variant="filled"
      type={type}
      InputProps={{
        disableUnderline: true,
        ...(readOnly && {
          endAdornment: <Lock />,
        }),
      }}
    />
  );
};

Text.propTypes = {
  type: PropTypes.string,
};

Text.defaultProps = {
  type: 'text',
};

export default Text;

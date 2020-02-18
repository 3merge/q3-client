import React from 'react';
import PropTypes from 'prop-types';
import { merge } from 'lodash';
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
    onBlur,
  } = useDecorator(props);

  const etc = merge(
    {},
    field,
    Object.entries(props).reduce(
      (curr, [key, value]) =>
        value !== undefined
          ? Object.assign(curr, { [key]: value })
          : curr,
      {},
    ),
  );

  return (
    <TextField
      disabled={disabled}
      readOnly={readOnly}
      label={label}
      helperText={helperText}
      error={error}
      fullWidth
      variant="filled"
      type={type}
      InputProps={{
        ...(readOnly && {
          endAdornment: <Lock />,
        }),
      }}
      {...etc}
      onBlur={onBlur}
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

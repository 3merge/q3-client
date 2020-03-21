import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Lock from '@material-ui/icons/Lock';
import useDecorator from '../helpers/useDecorator';

const Text = (props) => {
  const { type } = props;

  const {
    disabled,
    readOnly,
    label,
    helperText,
    error,
    onBlur,
    onChange,
    ...etc
  } = useDecorator(props);

  return (
    <TextField
      {...etc}
      disabled={disabled}
      readOnly={readOnly}
      error={error}
      fullWidth
      label={label}
      helperText={helperText}
      variant="filled"
      type={type}
      InputProps={{
        ...(readOnly && {
          endAdornment: <Lock />,
        }),
      }}
      onBlur={onBlur}
      onChange={onChange}
      {...Object.entries(props).reduce(
        (curr, [key, value]) =>
          value !== undefined
            ? Object.assign(curr, { [key]: value })
            : curr,
        {},
      )}
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

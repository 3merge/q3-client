import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import TextField from '@material-ui/core/TextField';
import Lock from '@material-ui/icons/Lock';
import useDecorator from '../helpers/useDecorator';

const Text = (props) => {
  const { type, readOnly } = props;
  const [field] = useField(props);
  const decorators = useDecorator(props);

  return (
    <TextField
      {...field}
      {...decorators}
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
  readOnly: PropTypes.bool,
};

Text.defaultProps = {
  type: 'text',
  readOnly: false,
};

export default Text;

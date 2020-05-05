import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { omit, isUndefined } from 'lodash';
import Lock from '@material-ui/icons/Lock';
import withGrid from '../withGrid';
import { removeDecoratedProps } from '../helpers';

export const Text = (props) => {
  const { readOnly } = props;
  const forward = removeDecoratedProps(
    omit(props, isUndefined),
  );

  return (
    <TextField
      {...forward}
      fullWidth
      readOnly={readOnly}
      variant="outlined"
      InputProps={{
        ...(readOnly && {
          endAdornment: <Lock />,
        }),
      }}
    />
  );
};

Text.propTypes = {
  disabled: PropTypes.bool,
  helperText: PropTypes.string,
  error: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  type: PropTypes.string,
};

Text.defaultProps = {
  disabled: false,
  error: false,
  helperText: '',
  onBlur: undefined,
  readOnly: false,
  type: 'text',
};

export default withGrid(Text);

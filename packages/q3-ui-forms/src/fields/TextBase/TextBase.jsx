import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { merge, omit, isUndefined } from 'lodash';
import withGrid from '../withGrid';
import useStyle from './useStyle';
import { removeDecoratedProps } from '../helpers';

export const chosenTextFieldDisplayAttributes = {
  fullWidth: true,
  size: 'small',
  variant: 'outlined',
  autoComplete: 'off',
  InputLabelProps: {
    shrink: true,
  },
};

export const TextBase = (props) => {
  const { children, readOnly, disabled, type } = props;
  const isDisabled = disabled || readOnly;

  const { root } = useStyle({
    disabled: isDisabled,
  });

  const allProps = merge(
    removeDecoratedProps(omit(props, isUndefined)),
    chosenTextFieldDisplayAttributes,
    {
      InputProps: {
        autoComplete: 'off',
        autocomplete: 'off',
      },
    },
  );

  return (
    <TextField
      {...allProps}
      className={root}
      disabled={isDisabled}
      readOnly={isDisabled}
      type={type}
    >
      {children}
    </TextField>
  );
};

TextBase.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  disabled: PropTypes.bool,
  helperText: PropTypes.string,
  error: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  type: PropTypes.string,
};

TextBase.defaultProps = {
  children: null,
  disabled: false,
  error: false,
  helperText: '',
  onBlur: undefined,
  readOnly: false,
  type: 'text',
};

export default withGrid(TextBase);

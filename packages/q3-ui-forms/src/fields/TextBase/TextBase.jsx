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
};

export const TextBase = (props) => {
  const {
    children,
    readOnly,
    disabled,
    type,
    error,
  } = props;
  const isDisabled = disabled || readOnly;

  const { root } = useStyle({
    disabled: isDisabled,
  });

  const allProps = merge(
    removeDecoratedProps(omit(props, isUndefined)),
    chosenTextFieldDisplayAttributes,
  );

  return (
    <TextField
      // ensure some of the custom props we're using
      // don't forward into the HTML
      {...omit(allProps, [
        'attribute',
        'children',
        'errors',
        'setValue',
        'values',
        'vars',
        'positive',
        'value',
      ])}
      // date inputs cast to null on clear
      value={allProps.value === null ? '' : allProps.value}
      className={root}
      disabled={isDisabled}
      readOnly={isDisabled}
      error={Boolean(error)}
      type={type}
    >
      {children}
    </TextField>
  );
};

TextBase.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
    PropTypes.array,
  ]),
  disabled: PropTypes.bool,
  helperText: PropTypes.string,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
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

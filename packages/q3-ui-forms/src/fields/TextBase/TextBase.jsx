import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { merge, omit, isUndefined } from 'lodash';
import { object } from 'q3-ui-helpers';
import withGrid from '../withGrid';
import useStyle from './useStyle';
import { removeDecoratedProps } from '../helpers';

export const marshalProps = (v) =>
  omit(v, [
    'attribute',
    'children',
    'errors',
    'setValue',
    'values',
    'vars',
    'positive',
    'value',
    'override',
    'under',
    'onChange',
    'validate',
    'suppressLabel',
    'suppressHelper',
  ]);

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

  const allProps = merge(
    removeDecoratedProps(omit(props, isUndefined)),
    chosenTextFieldDisplayAttributes,
  );

  const isDisabled = disabled || readOnly;

  const { root } = useStyle({
    disabled: isDisabled,
  });

  const [value, setLocalValue] = React.useState(
    String(allProps.value === null ? '' : allProps.value),
  );

  React.useEffect(() => {
    if (allProps.value !== value)
      setLocalValue(allProps.value);
  }, [allProps.value]);

  return (
    <TextField
      // ensure some of the custom props we're using
      // don't forward into the HTML
      {...marshalProps(allProps)}
      onChange={(event, ...rest) => {
        // available on synthetic event objects
        if (object.isFn(event.persist)) event.persist();
        const val = event.target.value;

        // update the state and reset the caret
        setTimeout(() => {
          if (!allProps.onChange) return null;

          return allProps.type === 'date'
            ? allProps.onChange(event, val)
            : allProps.onChange(event, ...rest);
        });

        setLocalValue(event.target.value);
      }}
      value={value}
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
  label: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  type: PropTypes.string,
};

TextBase.defaultProps = {
  children: null,
  disabled: false,
  error: false,
  helperText: '',
  onBlur: undefined,
  onChange: undefined,
  readOnly: false,
  type: 'text',
  label: '',
};

export default withGrid(TextBase);

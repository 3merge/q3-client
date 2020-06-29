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
  const [pos, setPos] = React.useState({
    start: null,
    end: null,
  });

  const allProps = merge(
    removeDecoratedProps(omit(props, isUndefined)),
    chosenTextFieldDisplayAttributes,
  );

  const { root } = useStyle({
    disabled: isDisabled,
  });

  const value = String(
    allProps.value === null ? '' : allProps.value,
  );

  React.useLayoutEffect(() => {
    try {
      if (pos.start) {
        allProps.inputRef.current.type = 'text';
        allProps.inputRef.current.setSelectionRange(
          pos.start,
          pos.end,
        );

        allProps.inputRef.current.type = type;
      }
    } catch (e) {
      // noop
    }
  }, [value]);

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
        'override',
        'under',
        'onChange',
      ])}
      onChange={(event, ...rest) => {
        event.persist();
        const caretStart = event.target.selectionStart;
        const caretEnd = event.target.selectionEnd;

        // update the state and reset the caret
        if (allProps.onChange)
          allProps.onChange(event, ...rest);

        setPos({
          start: caretStart,
          end: caretEnd,
        });
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

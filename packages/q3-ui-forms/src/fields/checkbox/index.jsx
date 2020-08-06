import React from 'react';
import PropTypes from 'prop-types';
import withState from '../withState';
import Bool from '../bool';
import withGrid from '../withGrid';

export const castToBoolean = (v) => {
  if (v === 'true' || v === '*') return true;
  if (v === 'false') return false;

  return Boolean(v);
};

export const fallbackToEmptyString = (
  checkedValue,
  formikValue,
) => {
  if (!checkedValue) return formikValue;
  return formikValue ? checkedValue : '';
};

const Checkbox = withState(
  ({
    variant,
    name,
    value,
    error,
    onChange,
    checkedValue,
    helperText,
    ...rest
  }) => {
    const handleOnChange = (e, v) =>
      onChange({
        target: {
          value: fallbackToEmptyString(checkedValue, v),
          name,
        },
      });

    return (
      <Bool
        {...rest}
        helperText={
          error || (variant && variant !== 'checkbox')
            ? helperText
            : undefined
        }
        variant={variant}
        isChecked={castToBoolean(value)}
        error={castToBoolean(error)}
        onChange={handleOnChange}
        name={name}
      />
    );
  },
);

Checkbox.propTypes = {
  variant: PropTypes.string,
};

Checkbox.defaultProps = {
  variant: 'checkbox',
};

export default withGrid(Checkbox, {
  xl: 12,
  lg: 12,
  style: {
    marginBottom: 0,
    marginTop: 0,
    paddingBottom: 0,
    paddingTop: 0,
  },
});

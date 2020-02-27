import React from 'react';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import useDecorator from '../../helpers/useDecorator';
import Bool from '../bool';

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

const Checkbox = ({ variant, ...rest }) => {
  const deco = useDecorator(rest);
  const [{ name, value }, { error }] = useField(rest);

  const handleOnChange = (e, v) =>
    deco.onChange({
      target: {
        value: fallbackToEmptyString(deco.checkedValue, v),
        name,
      },
    });

  return (
    <Bool
      {...deco}
      variant={variant}
      isChecked={castToBoolean(value)}
      error={castToBoolean(error)}
      onChange={handleOnChange}
      name={name}
    />
  );
};

Checkbox.propTypes = {
  variant: PropTypes.string,
};

Checkbox.defaultProps = {
  variant: 'checkbox',
};

export default Checkbox;

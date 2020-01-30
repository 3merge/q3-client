import React from 'react';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Box from '@material-ui/core/Box';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import { red, grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import useDecorator from '../helpers/useDecorator';
import { ControlledCheckbox } from './checkset';

const useStyles = makeStyles(() => ({
  errorCls: {
    color: red[500],
  },
  normal: {
    color: grey[500],
  },
  control: {
    lineHeight: 1.2,
    '& strong': {
      display: 'block',
    },
  },
  selectable: {
    display: 'flex',
    cursor: 'pointer',
    userSelect: 'none',
  },
}));

const castToBoolean = (v) => {
  if (v === 'true') return true;
  if (v === 'false') return false;
  return Boolean(v);
};

const Checkbox = ({ simple, ...rest }) => {
  const { control, errorCls, normal } = useStyles();
  const {
    label,
    helperText,
    disabled,
    readOnly,
    onChange,
  } = useDecorator(rest);
  const [{ name, value }, { error }] = useField(rest);

  const renderLabel = () => (
    <Typography variant="subtitle1" className={control}>
      <strong>{label}</strong>
      <small className={error ? errorCls : normal}>
        {helperText}
      </small>
    </Typography>
  );

  return simple ? (
    <ControlledCheckbox
      isChecked={castToBoolean(value)}
      value={castToBoolean(value)}
      label={label}
      name={name}
      disabled={disabled}
      readOnly={readOnly}
      onChange={() =>
        onChange({
          target: {
            value: !value,
            name,
          },
        })
      }
    />
  ) : (
    <Box my={2}>
      <FormControlLabel
        name={name}
        label={renderLabel()}
        control={
          <Switch
            name={name}
            checked={castToBoolean(value)}
            onChange={(e, v) =>
              onChange({
                target: {
                  value: v,
                  name,
                },
              })
            }
            disabled={disabled}
            readOnly={readOnly}
          />
        }
      />
    </Box>
  );
};

Checkbox.propTypes = {
  simple: PropTypes.bool,
};

Checkbox.defaultProps = {
  simple: false,
};

export default Checkbox;

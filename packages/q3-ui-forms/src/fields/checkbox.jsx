import React from 'react';
import { useField } from 'formik';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Box from '@material-ui/core/Box';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import { red, grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import useDecorator from '../helpers/useDecorator';

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

const Checkbox = (props) => {
  const { control, errorCls, normal } = useStyles();
  const {
    label,
    helperText,
    disabled,
    readOnly,
  } = useDecorator(props);
  const [{ name, value, onChange }, { error }] = useField(
    props,
  );

  const renderLabel = () => (
    <Typography variant="subtitle1" className={control}>
      <strong>{label}</strong>
      <small className={error ? errorCls : normal}>
        {helperText}
      </small>
    </Typography>
  );

  return (
    <Box my={2}>
      <FormControlLabel
        label={renderLabel()}
        control={
          <Switch
            name={name}
            checked={Boolean(value)}
            onChange={onChange}
            disabled={disabled}
            readOnly={readOnly}
          />
        }
      />
    </Box>
  );
};

export default Checkbox;

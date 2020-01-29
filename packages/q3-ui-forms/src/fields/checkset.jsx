import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useField } from 'formik';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import KeyboardDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardUp from '@material-ui/icons/KeyboardArrowUp';
import Checkbox from '@material-ui/core/Checkbox';
import useDecorator from '../helpers/useDecorator';

export const CollapseableFieldset = ({
  label,
  error,
  helperText,
  children,
  collapse,
}) => {
  const [show, setShow] = React.useState(true);
  const toggle = () => setShow(!show);

  const renderIcon = () => {
    if (!collapse) return null;
    return show ? <KeyboardUp /> : <KeyboardDown />;
  };

  return (
    <Box my={2}>
      <FormControl component="fieldset">
        <Button
          component={FormLabel}
          onClick={toggle}
          disabled={!collapse}
          style={{
            justifyContent: 'left',
            marginBottom: '0.5rem',
          }}
        >
          {renderIcon()}
          <Typography component="legend">
            {label}
          </Typography>
        </Button>
        <Collapse in={show}>{children}</Collapse>
        {helperText && (
          <FormHelperText error={error}>
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};

CollapseableFieldset.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  label: PropTypes.string.isRequired,
  collapse: PropTypes.bool,
};

CollapseableFieldset.defaultProps = {
  collapse: true,
  error: false,
  helperText: null,
};

export const ControlledCheckbox = ({
  label,
  value,
  onChange,
  isChecked,
  name,
}) => (
  <FormControlLabel
    control={
      <Checkbox
        name={name}
        value={value}
        onChange={onChange}
        checked={isChecked}
        size="small"
      />
    }
    label={label}
    key={value}
    style={{ display: 'block' }}
    size="small"
  />
);

const Checkset = (props) => {
  const [{ value = [] }, { error }] = useField(props);
  const { onArrayPush, options, ...rest } = useDecorator(
    props,
  );
  const { t } = useTranslation('labels');

  return Array.isArray(options) && options.length ? (
    <CollapseableFieldset {...rest} error={Boolean(error)}>
      {options.map((option) => (
        <ControlledCheckbox
          key={option.label}
          label={t(option.label)}
          value={option.value}
          onChange={onArrayPush}
          isChecked={value.includes(option.value)}
        />
      ))}
    </CollapseableFieldset>
  ) : null;
};

export default Checkset;

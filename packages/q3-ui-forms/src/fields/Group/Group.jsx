import React from 'react';
import PropTypes from 'prop-types';
import FormLabel from '@material-ui/core/FormLabel';
import Box from '@material-ui/core/Box';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import withGrid from '../withGrid';
import { formatFieldOptions } from '../../hooks/useOptions';

const Group = ({
  label,
  options,
  onChange,
  value,
  name,
  helperText,
  error,
  ...rest
}) => (
  <Box my={0.5}>
    {label && (
      <Box mb={0.25}>
        <FormLabel component="label" id={name}>
          {label}:
        </FormLabel>
      </Box>
    )}
    <ButtonGroup
      role="radiogroup"
      aria-labelledby={name}
      {...rest}
    >
      {formatFieldOptions(options).map((option) => {
        const checked = option.value === value;
        return (
          <Button
            role="radio"
            key={option.value}
            aria-checked={checked}
            onClick={(e) => onChange(e, option.value)}
            style={{
              backgroundColor: checked
                ? '#e0e0e0'
                : undefined,
            }}
          >
            {option.label}
          </Button>
        );
      })}
    </ButtonGroup>
    {helperText && (
      <FormHelperText error={error}>
        {helperText}
      </FormHelperText>
    )}
  </Box>
);

Group.defaultProps = {
  value: undefined,
  options: [],
  helperText: undefined,
  error: false,
};

Group.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
  ),
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  name: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  error: PropTypes.bool,
};

export default withGrid(Group, {
  xl: 12,
  lg: 12,
  md: 12,
});

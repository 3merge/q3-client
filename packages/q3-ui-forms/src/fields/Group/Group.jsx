import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import Box from '@material-ui/core/Box';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import withGrid from '../withGrid';

const Group = ({
  label,
  options,
  onChange,
  value,
  name,
}) => (
  <Box my={0.5}>
    {label && (
      <Box mb={0.25}>
        <FormLabel component="label" id={name}>
          {label}:
        </FormLabel>
      </Box>
    )}
    <ButtonGroup role="radiogroup" aria-labelledby={name}>
      {options.map((option) => {
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
  </Box>
);

export default withGrid(Group, {
  xl: 12,
  lg: 12,
  md: 12,
});

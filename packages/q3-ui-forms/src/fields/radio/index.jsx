import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import CollapsibleFieldLabel from 'q3-ui/lib/collapsibleFieldLabel';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import useDecorator from '../../helpers/useDecorator';

const Radioset = (props) => {
  const {
    label,
    helperText,
    error,
    options,
    onChange,
    value,
    disabled,
    readOnly,
  } = useDecorator(props);

  return (
    <CollapsibleFieldLabel
      label={label}
      error={error}
      helperText={helperText}
      {...props}
    >
      <RadioGroup
        aria-label={label}
        onChange={onChange}
        value={value}
      >
        {options.map((option) => (
          <FormControlLabel
            {...option}
            control={
              <Radio
                color="primary"
                disabled={disabled}
                readOnly={readOnly}
              />
            }
            key={option.label}
            disabled={disabled}
            readOnly={readOnly}
            name={option.label}
          />
        ))}
      </RadioGroup>
    </CollapsibleFieldLabel>
  );
};

export default Radioset;

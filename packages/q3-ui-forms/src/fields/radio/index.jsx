import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import CollapsibleFieldLabel from 'q3-ui/lib/collapsibleFieldLabel';
import useDecorator from '../../helpers/useDecorator';
import OptionsThreshold from '../optionsThreshold';
import Bool from '../bool';

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
        <OptionsThreshold options={options}>
          {(res = []) =>
            res.map((option) => (
              <Bool
                {...option}
                key={option.label}
                variant="radio"
                disabled={disabled}
                readOnly={readOnly}
                name={option.label}
              />
            ))
          }
        </OptionsThreshold>
      </RadioGroup>
    </CollapsibleFieldLabel>
  );
};

export default Radioset;

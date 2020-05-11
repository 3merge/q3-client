import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import CollapsibleFieldLabel from 'q3-ui/lib/collapsibleFieldLabel';
import Bool from '../bool';
import Options from '../optionsThreshold';
import useDecorator from '../../helpers/useDecorator';
import withGrid from '../withGrid';

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
    maxVisible,
    ...etc
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
        <Options maxVisible={maxVisible} options={options}>
          {(res = []) =>
            res.map((option) => (
              <Bool
                {...etc}
                {...option}
                variant="radio"
                key={option.label}
                disabled={disabled}
                readOnly={readOnly}
                name={option.label}
                isChecked={option.value === value}
              />
            ))
          }
        </Options>
      </RadioGroup>
    </CollapsibleFieldLabel>
  );
};

export default withGrid(Radioset, {
  xl: 12,
  lg: 12,
});

import React from 'react';
import CollapsibleFieldLabel from 'q3-ui/lib/collapsibleFieldLabel';
import withState from '../withState';
import Bool from '../bool';
import OptionsThreshold from '../optionsThreshold';
import withGrid from '../withGrid';

const Checkset = withState(
  ({
    maxVisible,
    onArrayPush,
    options,
    disabled,
    readOnly,
    value,
    error,
    ...rest
  }) => (
    <CollapsibleFieldLabel {...rest} error={Boolean(error)}>
      <OptionsThreshold
        maxVisible={maxVisible}
        options={options}
      >
        {(res = []) =>
          res.map((option) => {
            return (
              <Bool
                {...option}
                variant="checkbox"
                key={option.label}
                onChange={onArrayPush}
                isChecked={value.includes(option.value)}
                disabled={disabled}
                readOnly={readOnly}
              />
            );
          })
        }
      </OptionsThreshold>
    </CollapsibleFieldLabel>
  ),
);

export default withGrid(Checkset, {
  xl: 12,
  lg: 12,
});

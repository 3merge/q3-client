import React from 'react';
import { array } from 'q3-ui-helpers';
import MultiSelectMenuItem from '../MultiSelectMenuItem';
import { useOptions } from '../../hooks';
import withState from '../withState';
import SelectBase from '../SelectBase';

export default withState(
  ({
    name,
    label,
    helperText,
    onChange,
    readOnly,
    disabled,
    error,
    value = [],
    required,
    ...deco
  }) => {
    const v = array.condense(array.is(value));
    const { items, loading } = useOptions({
      minimumCharacterCount: 0,
      ...deco,
    });

    return (
      <SelectBase
        loading={loading}
        name={name}
        label={label}
        error={error}
        readOnly={readOnly}
        disabled={disabled}
        helperText={helperText}
        required={required}
        onChange={(e) => onChange(e)}
        SelectProps={{
          value: v,
          renderValue: array.print,
          multiple: true,
          native: false,
          MenuProps: {
            disablePortal: true,
          },
        }}
      >
        {items.map((obj) => (
          <MultiSelectMenuItem
            {...obj}
            key={obj.value}
            inputValue={v}
          />
        ))}
      </SelectBase>
    );
  },
);

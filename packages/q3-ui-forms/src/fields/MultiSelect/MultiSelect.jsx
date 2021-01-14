import React from 'react';
import { compose } from 'lodash/fp';
import { array } from 'q3-ui-helpers';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MultiSelectMenuItem from '../MultiSelectMenuItem';
import { useOptions } from '../../hooks';
import withState from '../withState';
import SelectBase from '../SelectBase';
import { valueToLabel } from '../helpers';

const useStyles = makeStyles(() => ({
  paper: {
    maxHeight: '400px',
  },
}));

const status = {
  checked: 'checked',
  unchecked: 'unchecked',
  indeterminate: 'indeterminate',
};

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
    xl,
    lg,
    md,
    displayLabelAsValue = false,
    ...deco
  }) => {
    const [isChecked, setState] = React.useState(
      status.unchecked,
    );

    const ref = React.useRef(null);

    const v = array.condense(array.is(value));
    const { items, loading } = useOptions({
      minimumCharacterCount: 0,
      ...deco,
    });

    const renderValue = displayLabelAsValue
      ? compose(array.print, valueToLabel(items))
      : array.print;

    if (loading) {
      <div>loading...</div>;
    }

    const cls = useStyles();

    console.log(isChecked);

    React.useEffect(() => {
      if (ref.current) {
        if (isChecked === status.checked) {
          const payload = {
            target: {
              value: items.map((x) => x.value),
              name,
            },
          };
          console.log(payload);
          onChange(payload);
        }
        if (isChecked === status.unchecked) {
          onChange({
            target: {
              name,
              value: [],
            },
          });
        }
      } else {
        ref.current = true;
      }
    }, [isChecked]);

    return (
      <SelectBase
        md={md}
        lg={lg}
        xl={xl}
        loading={loading}
        name={name}
        label={label}
        error={error}
        readOnly={readOnly}
        disabled={disabled}
        helperText={helperText}
        required={required}
        onChange={(e) => {
          console.log('clicked select base');
          if (isChecked === status.checked) {
            setState(status.indeterminate);
          }
          onChange(e);
        }}
        SelectProps={{
          value: v,
          renderValue,
          multiple: true,
          native: false,
          MenuProps: {
            disablePortal: true,
            classes: cls,
          },
        }}
      >
        <Box p={1}>
          <FormControlLabel
            control={
              <Checkbox
                indeterminate={
                  isChecked === status.indeterminate
                }
                checked={isChecked === status.checked}
                onChange={(e) => {
                  e.stopPropagation();
                  if (isChecked === status.checked) {
                    setState(status.unchecked);
                  } else {
                    setState(status.checked);
                  }
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                name="selectAll"
                color="primary"
              />
            }
            label="Select All"
          />
        </Box>
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

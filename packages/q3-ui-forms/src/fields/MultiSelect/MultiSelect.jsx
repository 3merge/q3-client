import React from 'react';
import { compose } from 'lodash/fp';
import { array } from 'q3-ui-helpers';
import makeStyles from '@material-ui/core/styles/makeStyles';
import MultiSelectMenuItem from '../MultiSelectMenuItem';
import { useOptions } from '../../hooks';
import withState from '../withState';
import SelectBase from '../SelectBase';
import { valueToLabel, STATUS } from '../helpers';
import SelectAll from './SelectAll';

const useStyles = makeStyles(() => ({
  paper: {
    maxHeight: '400px',
  },
}));

const { CHECKED, UNCHECKED, INDETERMINATE } = STATUS;

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
    const [isChecked, setState] = React.useState(UNCHECKED);

    const ref = React.useRef(null);

    const v = array.condense(array.is(value));
    const { items, loading } = useOptions({
      minimumCharacterCount: 0,
      ...deco,
    });

    const renderValue = displayLabelAsValue
      ? compose(array.print, valueToLabel(items))
      : array.print;

    const cls = useStyles();

    React.useEffect(() => {
      if (ref.current) {
        if (isChecked === CHECKED) {
          const payload = {
            target: {
              value: items.map((x) => x.value),
              name,
            },
          };
          onChange(payload);
        }
        if (isChecked === UNCHECKED) {
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
          if (isChecked === CHECKED) {
            setState(INDETERMINATE);
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
        <SelectAll
          status={isChecked}
          setState={setState}
          onChange={onChange}
        />
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

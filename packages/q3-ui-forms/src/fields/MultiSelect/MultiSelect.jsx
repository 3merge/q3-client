import React from 'react';
import { get, isObject, uniq } from 'lodash';
import { compose, map } from 'lodash/fp';
import { array } from 'q3-ui-helpers';
import MultiSelectMenuItem from '../MultiSelectMenuItem';
import { useOptions } from '../../hooks';
import withState from '../withState';
import SelectBase from '../SelectBase';
import { valueToLabel } from '../helpers';
import MultiSelectAll, { STATUS } from '../MultiSelectAll';
import useStyles from './useStyles';

const { CHECKED, UNCHECKED, INDETERMINATE } = STATUS;

export const genPayload = (name, value = []) => ({
  target: { name, value },
});

export const extractValues = (xs) =>
  map((x) => (isObject(x) ? x.value : x), xs);

const sort = (a) => array.is(a).sort();

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
    const [status, setStatus] = React.useState();
    const cls = useStyles();

    const v = array.condense(array.is(value));
    const { items, loading } = useOptions({
      minimumCharacterCount: 0,
      ...deco,
    });

    const handleOnChange = (e) => {
      if (status === CHECKED) setStatus(INDETERMINATE);

      const length = get(e, 'target.value.length', 0);

      if (length === 0) {
        setStatus(UNCHECKED);
      }
      if (length === items.length) {
        setStatus(CHECKED);
      }

      onChange(e);
    };

    const composedFns = [array.print, sort, uniq];

    if (displayLabelAsValue)
      composedFns.push(valueToLabel(items));

    const renderValue = compose(...composedFns);

    React.useEffect(() => {
      if (status === CHECKED)
        onChange(genPayload(name, extractValues(items)));

      if (status === UNCHECKED) onChange(genPayload(name));
    }, [status]);

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
        onChange={handleOnChange}
        SelectProps={{
          value: v,
          renderValue,
          multiple: true,
          native: false,
          MenuProps: {
            getContentAnchorEl: () => null,
            disablePortal: true,
            classes: cls,
          },
        }}
      >
        <MultiSelectAll
          status={status}
          setStatus={setStatus}
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

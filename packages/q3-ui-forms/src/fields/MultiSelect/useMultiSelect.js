import React from 'react';
import { STATUS } from '../helpers';

const { CHECKED, UNCHECKED, INDETERMINATE } = STATUS;

const useMultiSelect = ({ onChange, name, items }) => {
  const [isChecked, setState] = React.useState(UNCHECKED);
  const ref = React.useRef(null);

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
};

export default useMultiSelect;

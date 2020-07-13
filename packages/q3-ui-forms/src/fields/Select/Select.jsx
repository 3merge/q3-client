import React from 'react';
import { useOptions } from '../../hooks';
import SelectBase from '../SelectBase';
import withState from '../withState';
import SelectMenuItem from '../SelectMenuItem';

export default withState((props) => {
  const options = useOptions({
    minimumCharacterCount: 0,
    loadOptionsPlainly: true,
    ...props,
  });

  return (
    <SelectBase
      {...options}
      {...props}
      SelectProps={{ native: true }}
    >
      <SelectMenuItem {...options} {...props} />
    </SelectBase>
  );
});

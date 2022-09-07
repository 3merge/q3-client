import React from 'react';
import { get } from 'lodash';
import { Button, TextField } from '@material-ui/core';
import ColumnConfigurationContext from '../ColumnConfigurationContext';

const ColumnConfigurationDisplayName = () => {
  const { changeFieldData, fieldData } = React.useContext(
    ColumnConfigurationContext,
  );

  const [value, setValue] = React.useState(
    get(
      fieldData,
      'displayName',
      get(fieldData, 'field', ''),
    ),
  );

  return (
    <>
      <TextField
        fullWidth
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <Button
        onClick={() =>
          changeFieldData({
            displayName: value,
          })
        }
      >
        Apply
      </Button>
    </>
  );
};

export default ColumnConfigurationDisplayName;

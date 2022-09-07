import React from 'react';
import { get } from 'lodash';
import { Button, TextField } from '@material-ui/core';
import ColumnConfigurationContext from '../ColumnConfigurationContext';

const ColumnConfigurationStyle = () => {
  const { changeFieldData, fieldData } = React.useContext(
    ColumnConfigurationContext,
  );

  const [value, setValue] = React.useState(
    get(fieldData, 'width', 'auto'),
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
            width: value,
          })
        }
      >
        Apply
      </Button>
    </>
  );
};

export default ColumnConfigurationStyle;

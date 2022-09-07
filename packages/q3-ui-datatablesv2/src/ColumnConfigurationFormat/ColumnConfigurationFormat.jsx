import React from 'react';
import {
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import { get } from 'lodash';
import ColumnConfigurationContext from '../ColumnConfigurationContext';
import { acceptFormatOptions } from '../useStringHelper/useStringHelper';

const ColumnConfigurationFormat = () => {
  const { changeFieldData, fieldData } = React.useContext(
    ColumnConfigurationContext,
  );

  return (
    <RadioGroup
      aria-label="field format"
      name="format"
      onChange={(_, newValue) => {
        changeFieldData({
          format: newValue,
        });
      }}
      value={get(fieldData, 'format', null)}
    >
      <FormControlLabel
        control={<Radio />}
        label="none"
        value={null}
      />
      {acceptFormatOptions.sort().map((option) => (
        <FormControlLabel
          control={<Radio />}
          key={option}
          label={option}
          value={option}
        />
      ))}
    </RadioGroup>
  );
};

export default ColumnConfigurationFormat;

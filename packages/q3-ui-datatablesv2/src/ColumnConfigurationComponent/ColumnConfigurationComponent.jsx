import React from 'react';
import {
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import { get } from 'lodash';
import ColumnConfigurationContext from '../ColumnConfigurationContext';
import { cellComponentMap } from '../Cell/Cell';

const ColumnConfigurationComponent = () => {
  const { changeFieldData, fieldData } = React.useContext(
    ColumnConfigurationContext,
  );

  console.log('HELLO???');

  return (
    <RadioGroup
      aria-label="field component"
      name="component"
      onChange={(_, newValue) => {
        console.log(newValue);
        changeFieldData({
          component: newValue,
        });
      }}
      value={get(fieldData, 'component', 'text')}
    >
      {Object.keys(cellComponentMap)
        .sort()
        .map((componentName) => (
          <FormControlLabel
            control={<Radio />}
            key={componentName}
            label={componentName}
            value={componentName}
          />
        ))}
    </RadioGroup>
  );
};

export default ColumnConfigurationComponent;

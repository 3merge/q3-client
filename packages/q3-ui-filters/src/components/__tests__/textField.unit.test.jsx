import React from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import TextFieldWrapper from '../textField';

const measureLength = (Comp, Target) =>
  expect(global.shallow(Comp).find(Target)).toHaveLength(1);

describe('TextField', () => {
  it('should render TextField', () =>
    measureLength(
      <TextFieldWrapper
        type="number"
        name="number"
        op=">="
        label="number"
      />,
      TextField,
    ));

  it('should render Select', () =>
    measureLength(
      <TextFieldWrapper
        type="select"
        name="select"
        op="!="
        label="select"
        options={[]}
      />,
      Select,
    ));

  it('should render TextField', () =>
    measureLength(
      <TextFieldWrapper
        type="date"
        name="date"
        op="<="
        label="date"
      />,
      KeyboardDatePicker,
    ));
});

import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckboxWrapper from '../checkBox';
import { handleOnChangeBoolean } from '../utils';

jest.mock('../utils', () => ({
  extractTextualValue: jest.fn().mockReturnValue(true),
  handleOnChangeBoolean: jest
    .fn()
    .mockReturnValue(jest.fn()),
}));

const getProps = () => ({
  name: 'check',
  label: 'Checkbox label text',
  op: '*',
});

describe('Checkbox', () => {
  it('should register onChange', () => {
    const el = global
      .shallow(<CheckboxWrapper {...getProps()} />)
      .find(FormControlLabel)
      .props().control;

    el.props.onChange();
    expect(el.props.checked).toBeTruthy();
    expect(handleOnChangeBoolean).toHaveBeenCalled();
  });
});

import React from 'react';
import { FormControlLabel } from '@material-ui/core';
import MultiSelectAll from './MultiSelectAll';
import { STATUS } from './MultiSelectAll';

const { CHECKED, UNCHECKED, INDETERMINATE } = STATUS;

const render = (status) =>
  global.shallow(
    <MultiSelectAll status={status} setState={jest.fn()} />,
  );

describe('MultiSelectAll', () => {
  it.each([
    [UNCHECKED, 'selectAll'],
    [CHECKED, 'deselectAll'],
  ])(
    'should pick a correct label based on "status" state',
    (status, label) => {
      expect(
        render(status).find(FormControlLabel).prop('label'),
      ).toBe(label);
    },
  );

  it(`should set indeterminate prop true on "${INDETERMINATE}"`, () => {
    const { props } = render(INDETERMINATE)
      .find(FormControlLabel)
      .prop('control');
    expect(props.indeterminate).toBeTruthy();
  });

  it(`should set checked prop true on "${CHECKED}"`, () => {
    const { props } = render(CHECKED)
      .find(FormControlLabel)
      .prop('control');
    expect(props.checked).toBeTruthy();
  });

  it.todo(`should change status to "${CHECKED}"`);
  it.todo(`should change status to "${UNCHECKED}"`);
});

import React from 'react';
import {
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import MultiSelectAll from './MultiSelectAll';
import { STATUS } from './MultiSelectAll';

const { CHECKED, UNCHECKED, INDETERMINATE } = STATUS;

const setStatus = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

const render = (status) =>
  global.shallow(
    <MultiSelectAll
      status={status}
      setStatus={setStatus}
    />,
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

  it.each([
    [CHECKED, UNCHECKED],
    [UNCHECKED, CHECKED],
    [INDETERMINATE, CHECKED],
  ])(
    `should change status to "${CHECKED}"`,
    (current, after) => {
      const wrapper = global
        .mount(
          <MultiSelectAll
            setStatus={setStatus}
            status={current}
          />,
        )
        .find(Checkbox);

      wrapper.props().onChange({});

      expect(setStatus).toHaveBeenCalledWith(after);
    },
  );
});

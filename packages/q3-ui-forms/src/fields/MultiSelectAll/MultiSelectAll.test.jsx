import React from 'react';
import {
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import MultiSelectAll from './MultiSelectAll';
import { STATUS } from './MultiSelectAll';

const { CHECKED, UNCHECKED, INDETERMINATE } = STATUS;

const setStatus = jest.fn();

const render = (status) =>
  global.shallow(
    <MultiSelectAll
      status={status}
      setStatus={setStatus}
    />,
  );

const expectPropChange = (state) => {
  const { props } = render(state)
    .find(FormControlLabel)
    .prop('control');
  expect(props[state]).toBeTruthy();
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('MultiSelectAll', () => {
  it.each([
    [UNCHECKED, 'selectAllItems'],
    [CHECKED, 'deselectAllItem'],
  ])(
    'should pick a correct label based on "status" state',
    (status, label) => {
      expect(
        render(status).find(FormControlLabel).prop('label'),
      ).toBe(label);
    },
  );

  it(`should set indeterminate prop true on "${INDETERMINATE}"`, () => {
    expectPropChange(INDETERMINATE);
  });

  it(`should set checked prop true on "${CHECKED}"`, () => {
    expectPropChange(CHECKED);
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

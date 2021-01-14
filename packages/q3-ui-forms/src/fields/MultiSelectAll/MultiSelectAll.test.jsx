import { STATUS } from './MultiSelectAll';

const { CHECKED, UNCHECKED, INDETERMINATE } = STATUS;

describe('MultiSelectAll', () => {
  it.todo(
    `should tell the user to select all (label) when ${UNCHECKED}`,
  );

  it.todo(
    `should tell the user to de-select all (label) when ${CHECKED}`,
  );

  it.todo(
    `should set indetermine prop true on "${INDETERMINATE}"`,
  );

  it.todo(`should set checked prop true on "${CHECKED}"`);
  it.todo(`should change status to "${CHECKED}"`);
  it.todo(`should change status to "${UNCHECKED}"`);
});

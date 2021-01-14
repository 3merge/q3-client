import { STATUS } from '../MultiSelectAll';

const { CHECKED, UNCHECKED, INDETERMINATE } = STATUS;

describe('MultiSelect', () => {
  describe('"genPayload"', () => {
    it.todo(
      'should assign parameters to nested object structure',
    );
  });

  describe('"extractValues"', () => {
    it.todo(
      'should extract value property from all objects in the array',
    );

    it.todo(
      'should return each item if the array contains only string value',
    );
  });

  it.todo(
    'should match item labels with state value when displayLabelAsValue is true',
  );

  it.todo(
    'should serialize values with a comma when displayLabelAsValue is false',
  );

  it.todo(
    `should set checked to "${INDETERMINATE}" when the value contains some of the available items`,
  );

  it.todo(
    `should set checked to "${CHECKED}" when the value contains all of the available items`,
  );

  it.todo(
    `should set checked to "${UNCHECKED}" when the value contains none of the available items`,
  );
});

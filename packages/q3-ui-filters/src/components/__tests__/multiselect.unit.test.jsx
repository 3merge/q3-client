import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import MultiSelectWrapper, {
  addToOrFilterOut,
  flattenOptions,
} from '../multiSelect';

const multiSelectStub = {
  label: 'Foo',
  name: 'foo',
  type: 'checkboxGroup',
  op: '[]',
  next: jest.fn(),
  done: jest.fn(),
};

describe('Multiselect', () => {
  describe('"addToOrFilterOut"', () => {
    it('should add to the array', () => {
      const opts = addToOrFilterOut([1, 2], 3, true);
      expect(opts).toHaveLength(3);
    });

    it('should not add to the array', () => {
      const opts = addToOrFilterOut([1, 2, 3], 3, true);
      expect(opts).toHaveLength(3);
    });

    it('should remove from the array', () => {
      const opts = addToOrFilterOut([1, 2], 1, false);
      expect(opts).toHaveLength(1);
    });
  });

  describe('"flattenOptions"', () => {
    it('should return values', () => {
      const a = flattenOptions([
        { value: 1 },
        { value: 2 },
      ]);
      expect(a).toEqual([1, 2]);
    });

    it('should return values unmodified', () => {
      const a = flattenOptions([1, 2]);
      expect(a).toEqual([1, 2]);
    });
  });

  it('should render Autocomplete', () => {
    expect(
      global
        .shallow(
          <MultiSelectWrapper
            type="chips"
            name="chips"
            label="autocomplete!"
            op="[]"
          />,
        )
        .find(Autocomplete),
    ).toHaveLength(1);
  });

  describe('"MultiSelectCheckboxOption"', () => {
    it('should iterate options', () => {
      const el = global
        .shallow(
          <MultiSelectWrapper
            {...multiSelectStub}
            options={[{ value: '1', label: '1' }]}
          />,
        )
        .find(FormControl);
      expect(el).toHaveLength(1);
    });

    it('should hide component options', () => {
      const el = global
        .shallow(
          <MultiSelectWrapper
            {...multiSelectStub}
            options={[]}
          />,
        )
        .find(FormControl);
      expect(el).toHaveLength(0);
    });
  });
});

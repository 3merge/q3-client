import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MultiSelectWrapper, {
  addToOrFilterOut,
  flattenOptions,
} from '../multiSelect';

describe('Multiselect', () => {
  describe('"addToOrFilterOut"', () => {
    it('should add to the array', () => {
      const opts = addToOrFilterOut([1, 2], 3, true);
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

  it('should render FormGroup', () => {
    expect(
      global
        .shallow(
          <MultiSelectWrapper
            type="checkboxGroup"
            name="chips"
            label="autocomplete!"
            op="![]"
          />,
        )
        .find(FormGroup),
    ).toHaveLength(1);
  });
});

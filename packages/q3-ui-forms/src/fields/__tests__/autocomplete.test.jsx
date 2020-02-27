import React from 'react';
import Autocomplete, {
  getDropdownLabel,
} from '../autocomplete';

jest.mock('formik');

describe('Autocomplete', () => {
  it('should return label from option', () =>
    expect(
      global
        .shallow(<Autocomplete loadOptions={jest.fn()} />)
        .props()
        .getOptionLabel({
          label: 'foo',
        }),
    ).toMatch('foo'));

  it('should return plain string', () =>
    expect(
      global
        .shallow(<Autocomplete loadOptions={jest.fn()} />)
        .props()
        .getOptionLabel('foo'),
    ).toMatch('foo'));

  it('should match with default value', () => {
    expect(
      getDropdownLabel({
        value: 'UK',
        label: 'United Kingdom',
      })('UK'),
    ).toMatch('United Kingdom');
  });
});

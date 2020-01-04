import React from 'react';
import { useField } from 'formik';
import Autocomplete from '../autocomplete';

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
    useField.mockReturnValue([
      {
        value: {
          value: 'UK',

          label: 'United Kingdom',
        },
      },
      {},
    ]);

    expect(
      global
        .shallow(<Autocomplete loadOptions={jest.fn()} />)
        .props()
        .getOptionLabel('UK'),
    ).toMatch('United Kingdom');
  });
});

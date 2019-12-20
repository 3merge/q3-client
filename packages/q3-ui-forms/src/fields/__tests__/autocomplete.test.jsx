import React from 'react';
import Autocomplete from '../autocomplete';

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
});

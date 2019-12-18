import React from 'react';
import Autocomplete from '../autocomplete';

describe('Autocomplete', () => {
  it('should return label from option', () =>
    expect(
      global
        .shallow(<Autocomplete />)
        .props()
        .getOptionLabel({
          label: 'foo',
        }),
    ).toMatch('foo'));

  it('should return plain string', () =>
    expect(
      global
        .shallow(<Autocomplete />)
        .props()
        .getOptionLabel('foo'),
    ).toMatch('foo'));
});

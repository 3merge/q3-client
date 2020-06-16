import React from 'react';
import MuiAutocomplete from '@material-ui/lab/Autocomplete';
import Autocomplete from './Autocomplete';

jest.mock('../withState');

describe('AutoComplete', () => {
  it('should return label from option', () => {
    const out = global
      .mount(
        <Autocomplete label="test" name="test" value="1" />,
      )
      .find(MuiAutocomplete)
      .props()
      .getOptionLabel({
        label: 'Foo',
        value: '1',
      });

    expect(out).toMatch('Foo');
  });
});

import React from 'react';
import MuiAutocomplete from '@material-ui/lab/Autocomplete';
import Autocomplete from './Autocomplete';
import { useOptions } from '../../hooks';

jest.mock('../withState');
jest.mock('../../hooks', () => ({
  useOptions: jest.fn().mockReturnValue({}),
}));

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

  it('should call input value on change', () => {
    useOptions.mockReturnValue({
      onChange: jest.fn(),
      value: 'foo',
    });

    const { onChange } = global
      .mount(
        <Autocomplete
          label="test"
          name="test"
          freeSolo
          value="bar"
        />,
      )
      .find(MuiAutocomplete)
      .props();

    expect(onChange).toHaveBeenCalledWith('foo');
  });

  it('should call value on change', () => {
    const onChange = jest.fn();
    useOptions.mockReturnValue({
      onChange,
      value: '',
    });

    const { onChange: onStateChange } = global
      .mount(
        <Autocomplete
          label="test"
          name="test"
          freeSolo
          value="bar"
        />,
      )
      .find(MuiAutocomplete)
      .props();

    expect(onStateChange).not.toHaveBeenCalled();

    expect(onChange).toHaveBeenCalledWith({
      target: {
        value: 'bar',
      },
    });
  });
});

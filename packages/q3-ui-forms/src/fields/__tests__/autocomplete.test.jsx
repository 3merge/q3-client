import React from 'react';
import { AutoCompleteWrapper } from '../autocomplete';

jest.mock('formik');

describe('AutoCompleteWrapper', () => {
  it('should return label from option', () =>
    expect(
      global
        .shallow(
          <AutoCompleteWrapper loadOptions={jest.fn()} />,
        )
        .props()
        .getOptionLabel({
          label: 'foo',
        }),
    ).toMatch('foo'));

  it('should return plain string', () =>
    expect(
      global
        .shallow(
          <AutoCompleteWrapper loadOptions={jest.fn()} />,
        )
        .props()
        .getOptionLabel('foo'),
    ).toMatch('foo'));
});

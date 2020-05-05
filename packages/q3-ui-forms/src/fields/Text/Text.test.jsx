import React from 'react';
import Lock from '@material-ui/icons/Lock';
import { Text } from './Text';

jest.mock('formik');

describe('Text', () => {
  it('should apply props with values', () => {
    const { onArrayPull, noop, type } = global
      .shallow(
        <Text
          onChange={jest.fn()}
          label="Required"
          name="Required"
          onArrayPull={jest.fn()}
          noop={undefined}
          type="number"
        />,
      )
      .props();
    expect(onArrayPull).toBeUndefined();
    expect(noop).toBeUndefined();
    expect(type).toMatch('number');
  });

  it('should display <Lock /> icon on readOnly', () => {
    const props = global
      .shallow(
        <Text
          readOnly
          onChange={jest.fn()}
          label="Required"
          name="Required"
        />,
      )
      .props().InputProps;
    expect(props).toHaveProperty('endAdornment', <Lock />);
  });
});

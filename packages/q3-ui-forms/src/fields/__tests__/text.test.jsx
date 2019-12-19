import React from 'react';
import Lock from '@material-ui/icons/Lock';
import Text from '../text';

jest.mock('formik');

describe('Text', () => {
  it('should display <Lock /> icon on readOnly', () => {
    const props = global.shallow(<Text readOnly />).props()
      .InputProps;
    expect(props).toHaveProperty('endAdornment', <Lock />);
  });
});

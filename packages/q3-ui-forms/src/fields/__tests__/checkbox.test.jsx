import React from 'react';
import { getIn } from 'formik';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '../checkbox';

jest.mock('formik');

describe('Checkbox', () => {
  it('should render an error label', () => {
    getIn.mockReturnValue('Noop');

    const { label } = global
      .shallow(<Checkbox name="demo" />)
      .find(FormControlLabel)
      .props();

    const small = global.shallow(label.props.children[1]);
    expect(small.props().className).toMatch('error');
    expect(small.text()).toMatch('Noop');
  });
});

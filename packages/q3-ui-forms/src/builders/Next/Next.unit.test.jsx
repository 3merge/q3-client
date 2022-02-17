import React from 'react';
import Button from '@material-ui/core/Button';
import Next from './Next';
import { useAllowSubmit } from '../../hooks';

jest.mock('../../hooks', () => ({
  useAllowSubmit: jest.fn(),
}));

describe('Next', () => {
  it('should render children fn', () => {
    const fn = jest.fn();
    global.shallow(<Next>{fn}</Next>);
    expect(fn).toHaveBeenCalled();
  });

  it('should disable the underlying button', () => {
    useAllowSubmit.mockReturnValue(false);
    expect(
      global
        .shallow(<Next submit />)
        .find(Button)
        .props(),
    ).toHaveProperty('disabled', true);
  });

  it('should assign type "submit"', () => {
    expect(
      global
        .shallow(<Next submit />)
        .find(Button)
        .props(),
    ).toHaveProperty('type', 'submit');
  });
});

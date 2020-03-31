import React from 'react';
import { navigate } from '@reach/router';
import Button from '@material-ui/core/Button';
import Trash from '.';

jest.mock('../state');

jest.mock('@reach/router', () => ({
  navigate: jest.fn(),
}));

beforeEach(() => {
  navigate.mockReset();
  jest.spyOn(React, 'useContext').mockReturnValue({
    data: {},
    patch: jest.fn().mockReturnValue(jest.fn()),
    remove: jest.fn().mockReturnValue(jest.fn()),
    id: 1,
  });
});

describe('Trash', () => {
  const renderAndClick = () => {
    return global
      .shallow(<Trash />)
      .find(Button)
      .props()
      .onClick();
  };

  it.skip('should redirect on resolve', (done) => {
    const onClick = jest.fn().mockResolvedValue();
    renderAndClick(onClick);

    setTimeout(() => {
      expect(onClick).toHaveBeenCalled();
      expect(navigate).toHaveBeenCalledWith('/');
      done();
    });
  });

  it.skip('should do nothing on reject', (done) => {
    const onClick = jest.fn().mockRejectedValue();
    renderAndClick(onClick);

    setTimeout(() => {
      expect(onClick).toHaveBeenCalled();
      expect(navigate).not.toHaveBeenCalledWith('/');
      done();
    });
  });
});

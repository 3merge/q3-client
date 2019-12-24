import React from 'react';
import { navigate } from '@reach/router';
import Button from '@material-ui/core/Button';
import { SplitPanel } from 'q3-ui/lib/panel';
import Trash from '../trash';

jest.mock('@reach/router', () => ({
  navigate: jest.fn(),
}));

beforeEach(() => {
  navigate.mockReset();
});

describe('Trash', () => {
  const renderAndClick = (onClick) => {
    const el = global.shallow(
      <Trash onClick={onClick} url="/" />,
    );
    el.find(SplitPanel)
      .dive()
      .find(Button)
      .props()
      .onClick();
  };

  it('should redirect on resolve', (done) => {
    const onClick = jest.fn().mockResolvedValue();
    renderAndClick(onClick);

    setTimeout(() => {
      expect(onClick).toHaveBeenCalled();
      expect(navigate).toHaveBeenCalledWith('/');
      done();
    });
  });

  it('should do nothing on reject', (done) => {
    const onClick = jest.fn().mockRejectedValue();
    renderAndClick(onClick);

    setTimeout(() => {
      expect(onClick).toHaveBeenCalled();
      expect(navigate).not.toHaveBeenCalledWith('/');
      done();
    });
  });
});
